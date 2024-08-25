import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() btnClass: string = 'btn-default'; // Bootstrap button class (e.g., 'btn-primary', 'btn-secondary')
  @Input() btnStyle: any = {}; // Inline styles for the button
  @Output() btnClick = new EventEmitter<void>();

  onClick() {
    this.btnClick.emit();
  }
}
