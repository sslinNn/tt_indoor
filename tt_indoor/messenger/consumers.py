import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from .models import Message
from .serializers import MessageSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = 'public_chat'
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        old_messages = await self.get_old_messages()
        for message in old_messages:
            serializer = MessageSerializer(message)
            await self.send(text_data=json.dumps({
                'message': serializer.data
            }))

    @database_sync_to_async
    def get_old_messages(self):
        # Get old messages from the database
        return list(Message.objects.order_by('-timestamp')[:50])

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user_id = text_data_json['user_id']

        # Save message to the database
        user = await self.get_user(user_id)  # Await the async method
        chat_message = await self.save_message(user, message)  # Await the async save method

        # Serialize the message to send
        serializer = MessageSerializer(chat_message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': serializer.data
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))

    @database_sync_to_async
    def get_user(self, user_id):
        return User.objects.get(id=user_id)

    @database_sync_to_async
    def save_message(self, user, content):
        chat_message = Message(username=user, content=content)
        chat_message.save()
        return chat_message
