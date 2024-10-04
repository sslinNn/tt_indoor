import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  messageText: string = '';
  user_LS: any = localStorage.getItem('user');
  user: any = JSON.parse(this.user_LS);
  userId: number = this.user.id;
  private messagesSubscription?: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.connect();

    this.messagesSubscription = this.chatService.messages.subscribe(
      (message) => {
        this.messages.push(`${message.username}: ${message.content}`);
      }
    );
  }

  sendMessage(): void {
    if (this.messageText.trim()) {
      this.chatService.sendMessage(this.userId, this.messageText);
      this.messageText = '';
    }
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    this.chatService.disconnect();
  }
}
