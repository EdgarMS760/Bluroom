import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-chat',
  templateUrl: './sidebar-chat.component.html',
  styleUrl: './sidebar-chat.component.css'
})
export class SidebarChatComponent {
  chats = [
    {
      image: 'https://via.placeholder.com/50',
      name: 'Usuario 1',
      lastMessage: 'hola como estas te habl...',
      unreadMessages: 3,
      time: '12:30 PM'
    },
    {
      image: 'https://via.placeholder.com/50',
      name: 'Usuario 2',
      lastMessage: 'nos vemos mañana...',
      unreadMessages: 1,
      time: '09:15 AM'
    }
  ];
}
