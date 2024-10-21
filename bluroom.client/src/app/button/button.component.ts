import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() btnClass: string = 'btn-default';
  @Input() btnStyle: any = {};
  @Input() isDisabled: boolean = false;
  @Output() btnClick = new EventEmitter<void>();

  onClick() {
    if (!this.isDisabled) {
      this.btnClick.emit(); // Emite el evento solo si el botón no está deshabilitado
    }
  }
}
