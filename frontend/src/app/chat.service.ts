import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: WebSocket | undefined;
  public messages: Subject<any> = new Subject<any>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public connect(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Проверяем, находимся ли мы на клиенте
      this.socket = new WebSocket('ws://147.45.103.62:8000/ws/chat/');

      this.socket.onopen = () => {
        console.log('WebSocket connection established');
      };

      this.socket.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        this.messages.next(messageData.message);
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    } else {
      console.log('WebSocket cannot be established on the server side');
    }
  }

  public sendMessage(userId: number, message: string): void {
    if (this.socket) {
      // Проверяем, инициализирован ли WebSocket
      const messageData = {
        user_id: userId,
        message: message,
      };
      this.socket.send(JSON.stringify(messageData));
    } else {
      console.log('WebSocket is not connected');
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = undefined;
    } else {
      console.log('WebSocket is already disconnected or not initialized');
    }
  }
}
