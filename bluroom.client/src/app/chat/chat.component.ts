import { Component } from '@angular/core';
import { SignalrService } from '../signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  mensajesEnviado: string[] = [];
  mensajesRecibido: string[] = [];
  usuario: string = 'Usuario1';
  mensaje: string = '';

  constructor(private signalRService: SignalrService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addRecibirMensajeListener((user: string, message: string) => {
      if (user === this.usuario) {
        this.mensajesEnviado.push(message);
      } else {
        this.mensajesRecibido.push(`${user}: ${message}`);
      }
    });
  }
  public sendMessage(): void {
    console.log("si entra", this.mensaje, "si")

    if (this.mensaje.trim() !== '') {
      console.log("si entra 2")
      this.signalRService.enviarMensaje(this.usuario, this.mensaje);
      this.mensaje = '';  // Limpiar el campo de entrada
    }
  }
}
