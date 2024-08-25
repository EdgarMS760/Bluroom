import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje-recibido',
  templateUrl: './mensaje-recibido.component.html',
  styleUrl: './mensaje-recibido.component.css'
})
export class MensajeRecibidoComponent {
  @Input() mensaje: string = '';
}
