import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket!: WebSocket;
  public messages: Subject<{
    sender: string;
    message: string;
    receiver: string;
  }>;

  constructor() {
    this.messages = new Subject<{
      sender: string;
      message: string;
      receiver: string;
    }>();
  }

}
