import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MuroComponent } from './muro/muro.component';
import { ChatComponent } from './chat/chat.component';
import { TareasComponent } from './tareas/tareas.component';
import { LogrosComponent } from './logros/logros.component';
import { DetalleTareaComponent } from './detalle-tarea/detalle-tarea.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'muro', component: MuroComponent },
  { path: 'mensajes', component: ChatComponent },
  { path: 'logros', component: LogrosComponent},
  { path: 'tareas', component: TareasComponent},
  { path: 'tarea-descripcion', component: DetalleTareaComponent},
  { path: 'crear-tarea', component: CrearTareaComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
