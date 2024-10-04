import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: WebSocket | undefined;
  public messages: Subject<any> = new Subject<any>();

  constructor() {}

  public connect(): void {
    this.socket = new WebSocket('ws://localhost:8000/ws/chat/');

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
  }

  public sendMessage(userId: number, message: string): void {
    const messageData = {
      user_id: userId,
      message: message,
    };
    this.socket?.send(JSON.stringify(messageData));
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
