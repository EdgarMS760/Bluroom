import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  mensajesEnviado: string[] = ['ewe', 'q roio'];
  mensajesRecibido: string[] = ['k we', 'q roio de q'];
}
