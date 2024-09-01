import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { WebrtcService } from '../webrtc.service';

@Component({
  selector: 'app-header-chat',
  templateUrl: './header-chat.component.html',
  styleUrls: ['./header-chat.component.css']
})
export class HeaderChatComponent {
  @Input() user!: {
    image: string;
    name: string;
    status: 'active' | 'inactive';
  };

  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;

  constructor(private webrtcService: WebrtcService) {}

  startVideoChat() {
    this.webrtcService.startLocalStream(this.localVideo.nativeElement);
    this.localVideo.nativeElement.classList.remove('d-none')
  }
}
