import { Component } from '@angular/core';
import { Alumno } from '../lista-alumnos/alumno.model';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrl: './muro.component.css'
})
export class MuroComponent {
  listaDeAlumnos: Alumno[] = [
    { id: 1, nombre: 'Edgar Martinez', fotoUrl: 'https://picsum.photos/200' },
    { id: 2, nombre: 'Jesus De La Cruz', fotoUrl: 'https://picsum.photos/200' },
    { id: 3, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' }
  ];

  onAlumnoSeleccionado(alumno: Alumno) {
    console.log('Alumno seleccionado:', alumno);
  }
}
