import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.component.html',
  styleUrls: ['./detalle-tarea.component.css']
})
export class DetalleTareaComponent implements OnInit {

  tareaTitulo: string = 'PRÁCTICA 0 - DISEÑO DE VENTANAS'; 
  tareaDescripcion: string = 'Lorem ipsum dolor sit amet...'; 

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtener los parámetros de la ruta para cargar la tarea correspondiente
    const titulo = this.route.snapshot.paramMap.get('titulo');
    const descripcion = this.route.snapshot.paramMap.get('descripcion');

    // Asigna los valores dinámicos a las variables
    if (titulo && descripcion) {
      this.tareaTitulo = titulo;
      this.tareaDescripcion = descripcion;
    }
  }

  completarTarea() {
    console.log('Tarea completada:', this.tareaTitulo);
    this.router.navigate(['/tareas']);
  }
}
