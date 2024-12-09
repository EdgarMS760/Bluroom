import { Component, ElementRef, Input, ViewChild, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MensajesService } from '../services/mensajes.service';
import { Subscription } from 'rxjs';

declare const JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-header-chat',
  templateUrl: './header-chat.component.html',
  styleUrls: ['./header-chat.component.css']
})
export class HeaderChatComponent implements OnDestroy, OnChanges {
  @Input() user!: { id_chat: number; id_user: number; image: string; name: string; status: string };
  @Input() chatId!: string;
  @Input() userId!: string;

  @ViewChild('videoChatContainer') videoChatContainer!: ElementRef<HTMLDivElement>;

  private jitsiAPI: any;
  private llamadaSubscription!: Subscription;

  public videollamadaActiva = false;
  public enVideollamada = false;

  constructor(
    private mensajesService: MensajesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chatId'] && !changes['chatId'].firstChange) {
      if (this.enVideollamada) {
        console.log('Cambiando de chat, colgando llamada actual...');
        this.hangUp();
      }
    }

    this.chatId = String(this.user.id_chat);
    this.userId = String(this.user.id_user);
    this.actualizarEstadoChat();

    console.log('Cambio detectado en chatId:', this.chatId); // Debug
  }



  ngOnInit() {
    this.actualizarEstadoChat();
  }

  ngOnDestroy() {
    this.desuscribirseLlamada();
    this.jitsiAPI?.dispose();
  }

  private actualizarEstadoChat() {
    this.desuscribirseLlamada();

    this.llamadaSubscription = this.mensajesService.getEstadoVideollamada(this.chatId).subscribe((llamada) => {
      this.videollamadaActiva = llamada?.activa || false;
      console.log('Estado de videollamada:', this.videollamadaActiva);
      this.cdr.detectChanges();
    });
  }


  private desuscribirseLlamada() {
    if (this.llamadaSubscription) {
      this.llamadaSubscription.unsubscribe();
    }
  }

  startVideoChat() {
    if (!this.chatId) {
      console.error('El ID del chat no está definido.');
      return;
    }

    this.mensajesService.iniciarVideollamada(this.chatId, this.userId, this.user.name)
      .then(() => {
        console.log('Llamada iniciada');
        this.iniciarSesionJitsi();
      })
      .catch((error) => console.error('Error al iniciar la videollamada:', error));
  }

  unirseALlamada() {
    if (!this.chatId) {
      console.error('El ID del chat no está definido.');
      return;
    }

    this.iniciarSesionJitsi();
  }

  hangUp() {
    if (this.jitsiAPI) {
      this.jitsiAPI.dispose();
      this.jitsiAPI = null; 
    }

   
    this.mensajesService.finalizarVideollamada(this.chatId)
      .then(() => {
        console.log('Llamada finalizada');
        this.videoChatContainer.nativeElement.classList.add('d-none'); 
        this.videollamadaActiva = false;
        this.enVideollamada = false;
      })
      .catch((error) => console.error('Error al finalizar la videollamada:', error));
  }


  private iniciarSesionJitsi() {
    this.videoChatContainer.nativeElement.classList.remove('d-none');

    this.jitsiAPI = new JitsiMeetExternalAPI('meet.jit.si', {
      roomName: `chat_${this.chatId}`,
      parentNode: this.videoChatContainer.nativeElement,
      userInfo: {
        displayName: this.user.name,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: false, 
        enableLobby: false,        
      },
      interfaceConfigOverwrite: {
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      },
    });

    this.jitsiAPI.addEventListener('readyToClose', () => this.hangUp());
  }

}
