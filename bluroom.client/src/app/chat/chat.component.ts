import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  mensajesEnviado: string[] = ['hola', 'que tal'];
  mensajesRecibido: string[] = ['hola', 'nada aqui'];
}
