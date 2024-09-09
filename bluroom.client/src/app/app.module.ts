import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Nav/Nav.component';
import { LoginComponent } from './login/login.component';
import { ButtonComponent } from './button/button.component';
import { RegistroComponent } from './registro/registro.component';
import { GrupoSubgrupoComponent } from './grupo-subgrupo/grupo-subgrupo.component';
import { SubgrupoComponent } from './subgrupo/subgrupo.component';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { MuroComponent } from './muro/muro.component';
import { MensajeEnviadoComponent } from './mensaje-enviado/mensaje-enviado.component';
import { MensajeRecibidoComponent } from './mensaje-recibido/mensaje-recibido.component';
import { EmailModalComponent } from './email-modal/email-modal.component';
import { SidebarChatComponent } from './sidebar-chat/sidebar-chat.component';
import { ChatComponent } from './chat/chat.component';
import { ItemListChatComponent } from './item-list-chat/item-list-chat.component';
import { HeaderChatComponent } from './header-chat/header-chat.component';
import { LogrosComponent } from './logros/logros.component';
import { TareasComponent } from './tareas/tareas.component';
import { DetalleTareaComponent } from './detalle-tarea/detalle-tarea.component';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    ButtonComponent,
    RegistroComponent,
    GrupoSubgrupoComponent,
    SubgrupoComponent,
    ListaAlumnosComponent,
    MuroComponent,
    MensajeEnviadoComponent,
    MensajeRecibidoComponent,
    EmailModalComponent,
    SidebarChatComponent,
    ChatComponent,
    ItemListChatComponent,
    HeaderChatComponent,
    LogrosComponent,
    TareasComponent,
    DetalleTareaComponent,
    CrearTareaComponent
    SidebarComponent,
    MainLayoutComponent,
    AuthLayoutComponent

  ],
  imports: [
    BrowserModule, HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
