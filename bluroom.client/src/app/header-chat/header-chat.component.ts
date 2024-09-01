import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-chat',
  templateUrl: './header-chat.component.html',
  styleUrl: './header-chat.component.css'
})
export class HeaderChatComponent {
  @Input() user!: {
    image: string;
    name: string;
    status: 'active' | 'inactive';
  };
}
