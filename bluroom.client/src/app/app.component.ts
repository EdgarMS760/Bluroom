import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from './Nav/Nav.component'
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { Alumno } from './lista-alumnos/alumno.model';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private http: HttpClient) {
  }

  title = 'bluroom.client';
}
