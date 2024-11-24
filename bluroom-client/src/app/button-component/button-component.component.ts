import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-component',
  templateUrl: './button-component.component.html',
  styleUrl: './button-component.component.css'
})
export class ButtonComponentComponent {
  @Input() text: string = 'Click me'; // Texto del botón
  @Input() type: string = 'button'; // Tipo de botón: 'button', 'submit', 'reset', etc.
  @Input() disabled: boolean = false; // Si el botón está deshabilitado
}
