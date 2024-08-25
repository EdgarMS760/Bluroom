import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  username: string = '';
  password: string = '';
  password2: string = '';
  email: string = '';

  constructor(private router: Router) { }

  handleButtonClick() {
    console.log('Botón clickeado');
  }

  onRegister() {
    // Aquí iría la lógica de autenticación
    //if (this.username === 'user' && this.password === 'password') {
    //  this.router.navigate(['/home']);
    //} else {
    //  alert('Login incorrecto');
    //}
  }
}
