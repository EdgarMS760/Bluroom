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
    { id: 3, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' },
    { id: 4, nombre: 'Edgar Martinez', fotoUrl: 'https://picsum.photos/200' },
    { id: 5, nombre: 'Jesus De La Cruz', fotoUrl: 'https://picsum.photos/200' },
    { id: 6, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' },
    { id: 7, nombre: 'Edgar Martinez', fotoUrl: 'https://picsum.photos/200' },
    { id: 8, nombre: 'Jesus De La Cruz', fotoUrl: 'https://picsum.photos/200' },
    { id: 9, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' },
    { id: 10, nombre: 'Edgar Martinez', fotoUrl: 'https://picsum.photos/200' },
    { id: 11, nombre: 'Jesus De La Cruz', fotoUrl: 'https://picsum.photos/200' },
    { id: 12, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' }
  ];
  mensajesEnviado: string[] = ['hola grupo', 'el proyecto se entrega la siguiente semana'];
  mensajesRecibido: string[] = ['enterado', 'como asi?'];

  onAlumnoSeleccionado(alumno: Alumno) {
    console.log('Alumno seleccionado:', alumno);
  }
}
