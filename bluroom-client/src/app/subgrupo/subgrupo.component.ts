import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-subgrupo',
  templateUrl: './subgrupo.component.html',
  styleUrls: ['./subgrupo.component.css']
})
export class SubgrupoComponent {
  @Input() subgrupo!: { id: number; nombre: string };
  @Output() subgrupoSeleccionado: EventEmitter<{ id: number, nombre: string }> = new EventEmitter();
  onSubgrupoClick() {
    this.subgrupoSeleccionado.emit({
      id: this.subgrupo.id,
      nombre: this.subgrupo.nombre
    });
  }
}
