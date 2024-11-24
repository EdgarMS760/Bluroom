import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent {
  tareaTitulo: string = '';
  tareaDescripcion: string = '';
  
  // Opciones para el selector de grupo y subgrupo
  grupos: string[] = ['Grupo A', 'Grupo B', 'Grupo C'];
  subgrupos: string[] = [];
  grupoSeleccionado: string = '';
  subgrupoSeleccionado: string = '';

  // Mapeo de subgrupos basado en el grupo seleccionado
  subgruposDisponibles: { [key: string]: string[] } = {
    'Grupo A': ['Subgrupo A1', 'Subgrupo A2'],
    'Grupo B': ['Subgrupo B1', 'Subgrupo B2'],
    'Grupo C': ['Subgrupo C1', 'Subgrupo C2']
  };

  constructor(private router: Router) {}

  // Cargar los subgrupos correspondientes al grupo seleccionado
  cargarSubgrupos() {
    this.subgrupos = this.subgruposDisponibles[this.grupoSeleccionado] || [];
  }

  // Función para crear la tarea
  crearTarea() {
    if (this.tareaTitulo && this.tareaDescripcion && this.grupoSeleccionado && this.subgrupoSeleccionado) {
      console.log('Tarea creada con éxito:');
      console.log('Título:', this.tareaTitulo);
      console.log('Descripción:', this.tareaDescripcion);
      console.log('Grupo:', this.grupoSeleccionado);
      console.log('Subgrupo:', this.subgrupoSeleccionado);

      // Aquí podrías enviar los datos a un servicio para guardarlos en la base de datos

      // Redirigir a la lista de tareas después de crearla
      this.router.navigate(['/tareas']);
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
