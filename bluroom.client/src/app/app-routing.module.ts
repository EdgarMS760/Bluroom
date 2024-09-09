import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MuroComponent } from './muro/muro.component';
import { ChatComponent } from './chat/chat.component';
import { TareasComponent } from './tareas/tareas.component';
import { LogrosComponent } from './logros/logros.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'register',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: RegistroComponent }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'muro', component: MuroComponent },
      { path: 'mensajes', component: ChatComponent },
      { path: 'logros', component: LogrosComponent },
      { path: 'tareas', component: TareasComponent },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
