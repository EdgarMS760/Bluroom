import { Component } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  usuario: string = 'Usuario1';
  mensaje: string = '';
  chatSeleccionado: any;
  headerUser: any = null;
  archivosSeleccionados: File[] = [];
  mensajes: any[] = [];

  usuarioActivo: any;
  constructor(private signalRService: SignalrService, private mensajesService: MensajesService) { }

  ngOnInit(): void {
    //this.signalRService.startConnection();
    //this.signalRService.addRecibirMensajeListener((user: string, message: string) => {
    //  if (user === this.usuario) {
    //    this.mensajesEnviado.push(message);
    //  } else {
    //    this.mensajesRecibido.push(`${user}: ${message}`);
    //  }
    //});
  }

  onChatSelected(chatInfo: any): void {
    console.log('Chat seleccionado en ChatComponent:', chatInfo);
    const usuarioLocal = localStorage.getItem('usuario');
    let usuarioNombre = '';

      this.headerUser = {
        image: chatInfo.image,
        name: chatInfo.name,
        status: 'active'
      };


    this.chatSeleccionado = chatInfo;
    const usuarioLocalStorage = localStorage.getItem('usuario');
    if (usuarioLocalStorage) {
      this.usuarioActivo = JSON.parse(usuarioLocalStorage);
    }
    this.loadMsg(chatInfo.id)
  }
  loadMsg(chatId: number): void {
    this.mensajesService.getMensajesPorChat(chatId)
      .subscribe(chatsSnapshot => {
        const chats = chatsSnapshot.map(doc => {
          const data = doc.payload.doc.data() as any;
          const id = doc.payload.doc.id;

          const fecha = data.fecha?.seconds
            ? new Date(data.fecha.seconds * 1000)
            : data.fecha;

          return { id, ...data, fecha };
        });

        this.mensajes = chats.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
      });
    console.log(this.mensajes);
  }
  onArchivosSeleccionados(event: any): void {
    this.archivosSeleccionados = Array.from(event.target.files);
  }
  eliminarArchivo(index: number): void {
    this.archivosSeleccionados.splice(index, 1);
  }
  async sendMessage(): Promise<void> {
    if (this.mensaje.trim() || this.archivosSeleccionados.length > 0) {
      const usuarioId = JSON.parse(localStorage.getItem('usuario') || '{}').id;
      const nombreuser = JSON.parse(localStorage.getItem('usuario') || '{}').nombre;
      try {
        await this.mensajesService.crearMensaje(this.chatSeleccionado.id, usuarioId, nombreuser, this.mensaje,  this.archivosSeleccionados);
        this.mensaje = '';  // Limpiar el campo de mensaje
        this.archivosSeleccionados = [];  // Limpiar los archivos seleccionados
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  }
}
