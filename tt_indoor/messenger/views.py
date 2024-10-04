from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer

class MessageList(generics.ListCreateAPIView):
    queryset = Message.objects.all().order_by('-timestamp')
    serializer_class = MessageSerializer