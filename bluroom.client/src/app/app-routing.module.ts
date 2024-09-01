import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MuroComponent } from './muro/muro.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'muro', component: MuroComponent },
  { path: 'mensajes', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
