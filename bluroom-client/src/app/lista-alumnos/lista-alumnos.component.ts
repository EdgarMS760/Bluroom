import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Alumno } from './alumno.model';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent {

  @Input() alumnos: Alumno[] = [];
  @Output() alumnoSeleccionado = new EventEmitter<Alumno>();

  onAlumnoClick(alumno: Alumno) {
    this.alumnoSeleccionado.emit(alumno);
  }
}

