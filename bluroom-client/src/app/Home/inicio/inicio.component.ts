import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  groups: string[] = [
    "LSTI",
    "LF",
    "LM",
    "LA",
    "LMAD",
    "LCC"
  ]; 
}
