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
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { InicioComponent } from './Home/inicio/inicio.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistroComponent },
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'inicio', component: InicioComponent},
      { path: 'muro', component: MuroComponent },
      { path: 'mensajes', component: ChatComponent },
      { path: 'logros', component: LogrosComponent },
      { path: 'tareas', component: TareasComponent },
      { path: 'tarea-descripcion', component: DetalleTareaComponent },
      { path: 'crear-tarea', component: CrearTareaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
