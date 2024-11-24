import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5233/chatHub', {
        withCredentials: true
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Conectado a SignalR'))
      .catch(err => console.log('Error al conectar a SignalR: ' + err));
  }

  public addRecibirMensajeListener(callback: (user: string, message: string) => void): void {
    this.hubConnection.on('RecibirMensaje', callback);
  }

  public enviarMensaje(user: string, message: string): void {
    this.hubConnection.invoke('EnviarMensaje', user, message)
      .catch(err => console.error(err));
  }
}
