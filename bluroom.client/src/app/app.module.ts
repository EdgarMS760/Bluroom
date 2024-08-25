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
    MensajeRecibidoComponent
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
