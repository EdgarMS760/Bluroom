import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-list-chat',
  templateUrl: './item-list-chat.component.html',
  styleUrl: './item-list-chat.component.css'
})
export class ItemListChatComponent {
  @Input() chatInfo!: {
    image: string;
    name: string;
    //lastMessage: string;
   // unreadMessages: number;
    time: string;
  };
  @Output() chatSelected: EventEmitter<any> = new EventEmitter();

  onChatClick(): void {
    this.chatSelected.emit(this.chatInfo); 
  }
}
