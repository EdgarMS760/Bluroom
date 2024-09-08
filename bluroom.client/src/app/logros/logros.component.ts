import { Component } from '@angular/core';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})
export class LogrosComponent {
  logros = [
    { titulo: 'Completa tu primera tarea', icono: 'assets/logros/incompleto/Completa primera tarea_bloqueado.png', completed: false },
    { titulo: 'Completa 5 tareas', icono: 'assets/logros/incompleto/5 tareas_bloqueado.png', completed: false },
    { titulo: 'Comenta en un grupo', icono: 'assets/logros/incompleto/Comenta en un grupo_bloqueado.png', completed: false },
    { titulo: 'Envía 10 mensajes', icono: 'assets/logros/incompleto/envia 10 mensajes_bloqueado.png', completed: false },
    { titulo: 'Envía una imagen', icono: 'assets/logros/complete/envia una imagen.png', completed: true },
    { titulo: 'Haz 2 videollamadas', icono: 'assets/logros/incompleto/2 videollamadas_bloqueado.png', completed: false }
  ];
}