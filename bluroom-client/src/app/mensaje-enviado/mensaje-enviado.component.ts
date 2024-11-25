import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje-enviado',
  templateUrl: './mensaje-enviado.component.html',
  styleUrl: './mensaje-enviado.component.css'
})
export class MensajeEnviadoComponent {
  @Input() mensaje: string = '';
  @Input() archivos: string[] = [];
  @Input() fecha: Date = new Date();
}
