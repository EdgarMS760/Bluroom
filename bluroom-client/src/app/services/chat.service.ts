import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = `${environment.apiUrl}/chat`; 

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo chat
  createChat(usuario1Id: number, usuario2Id: number): Observable<any> {
    const chatData = {
      userId1: usuario1Id,
      userId2: usuario2Id
    };

    return this.http.post(`${this.baseUrl}/create`, chatData);
  }

  getChatsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/index/${userId}`).pipe(
      map(chats =>
        chats.map(chat => {
          if (!chat.usuario1) {
            return {
              id: chat.chat_id,
              image: chat.usuario2?.avatar || 'https://via.placeholder.com/50',
              name: chat.usuario2?.nombre,
            };
          } else if (!chat.usuario2) {
            return {
              id: chat.chat_id,
              image: chat.usuario1?.avatar || 'https://via.placeholder.com/50',
              name: chat.usuario1?.nombre,
            };
          } else {
            return {
              id: chat.chat_id,
              image: chat.usuario1?.avatar || 'https://via.placeholder.com/50',
              name: chat.usuario1?.nombre,
            };
          }
        })
      )
    );
  }


}
