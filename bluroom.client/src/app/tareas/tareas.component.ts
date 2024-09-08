import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  tareas = [
    { titulo: 'Práctica - Proyecto Final', grupo: 'LMAD', subgrupo: 'Subgrupo 1', descripcion: 'Descripción de la tarea...' },
    { titulo: 'Práctica 1 - Diseño Ventanas', grupo: 'LMAD', subgrupo: 'Subgrupo 1', descripcion: 'Descripción de la tarea...' }
  ];

  constructor(private router: Router) {}

  verDetalle(tarea: any) {
    this.router.navigate(['/tarea', tarea.titulo]);
  }
}
