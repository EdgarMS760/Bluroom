import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-list-chat',
  templateUrl: './item-list-chat.component.html',
  styleUrl: './item-list-chat.component.css'
})
export class ItemListChatComponent {
  @Input() chatInfo!: {
    image: string;
    name: string;
    lastMessage: string;
    unreadMessages: number;
    time: string;
  };
}
