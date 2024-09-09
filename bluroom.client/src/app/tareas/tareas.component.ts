import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Grupo {
  nombre: string;
  seleccionado: boolean;
  subgrupos: string[];
}

interface Tarea {
  titulo: string;
  grupo: string;
  subgrupo: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {
  
  tareas: Tarea[] = [
    { titulo: 'Práctica - Proyecto Final', grupo: 'LMAD', subgrupo: 'Subgrupo 1', descripcion: 'Descripción de la tarea...', estado: 'pendiente'},
    { titulo: 'Práctica 1 - Diseño Ventanas', grupo: 'LMAD', subgrupo: 'Subgrupo 1', descripcion: 'Descripción de la tarea...', estado: 'pendiente'},
    { titulo: 'Práctica 2 - Diseño Ventanas', grupo: 'LMAD', subgrupo: 'Subgrupo 2', descripcion: 'Descripción de la tarea...', estado: 'completada'},
    { titulo: 'Práctica 3 - Diseño Ventanas', grupo: 'OTRO', subgrupo: 'Subgrupo 1', descripcion: 'Descripción de la tarea...', estado: 'pendiente'}
  ];
  grupos: Grupo[] = [
    { nombre: 'LMAD', seleccionado: true, subgrupos: ['Subgrupo 1', 'Subgrupo 2'] },
    { nombre: 'OTRO', seleccionado: false, subgrupos: ['Subgrupo 1', 'Subgrupo 2'] }
  ];
  subgrupoSeleccionado: string = 'Subgrupo 1';
  estadoSeleccionado: string = 'pendientes';
  tareasFiltradas: Tarea[] = [];

  constructor(private router: Router) {
    this.filtrarTareas();
  }
  
  seleccionarGrupo(grupo: Grupo) {
    this.grupos.forEach(g => g.seleccionado = false);
    grupo.seleccionado = true;
    this.filtrarTareas();
  }

  seleccionarSubgrupo(subgrupo: string) {
    this.subgrupoSeleccionado = subgrupo;
    this.filtrarTareas();
  }

  seleccionarEstado(estado: string) {
    this.estadoSeleccionado = estado;
    this.filtrarTareas();
  }

  filtrarTareas() {
    const grupoSeleccionado = this.grupos.find(g => g.seleccionado);
    if (!grupoSeleccionado) {
      this.tareasFiltradas = [];
      return;
    }
    const tareasFiltradas = this.tareas.filter(tarea => {
      return tarea.grupo === grupoSeleccionado.nombre &&
        tarea.subgrupo === this.subgrupoSeleccionado &&
        (this.estadoSeleccionado === 'pendientes' ? tarea.estado === 'pendiente' : tarea.estado === 'completada');
    });
    this.tareasFiltradas = tareasFiltradas;
  }

  verDetalle(tarea: Tarea) {
    this.router.navigate(['/tarea-descripcion']);
  }
}