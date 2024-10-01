import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  socket: WebSocketSubject<unknown> | undefined;
  ngOnInit(): void {
    const roomName = 'some-room'; // Имя комнаты, можно передавать динамически
    this.socket = new WebSocketSubject(
      `ws://localhost:8000/ws/chat/${roomName}/`
    );
  }

  sendMessage(): void {}
}
