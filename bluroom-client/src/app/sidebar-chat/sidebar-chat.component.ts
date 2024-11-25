import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrl: './sidebar-chat.component.css'
})
export class SidebarChatComponent {
  chats: any[] = [];
  @Output() chatSelected: EventEmitter<any> = new EventEmitter();
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();  // Obtener el ID del usuario desde el LocalStorage
    this.loadChats(userId);
  }
  getUserIdFromLocalStorage(): number {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario.id;
  }

  loadChats(userId: number): void {
    this.chatService.getChatsByUserId(userId).subscribe(
      (chats) => {
        this.chats = chats;
        console.log(chats)
      },
      (error) => {
        console.error('Error al obtener los chats:', error);
      }
    );

  }
  onChatSelected(chatInfo: any): void {
    this.chatSelected.emit(chatInfo); 
  }

}
