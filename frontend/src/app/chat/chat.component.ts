import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { ChatService } from '../chat.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  messageText: string = '';
  user_LS: any;
  user: any;
  userId: number = 0;
  private messagesSubscription?: Subscription;

  constructor(
    private chatService: ChatService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Проверяем, находимся ли мы на клиенте
      this.user_LS = localStorage.getItem('user');
      this.user = JSON.parse(this.user_LS);
      this.userId = this.user ? this.user.id : 0; // Безопасно извлекаем userId
    }
  }

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
