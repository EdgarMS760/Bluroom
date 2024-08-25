import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  handleButtonClick() {
    console.log('Botón clickeado');
  }

  onLogin() {
    // Aquí iría la lógica de autenticación
    //if (this.username === 'user' && this.password === 'password') {
    //  this.router.navigate(['/home']);
    //} else {
    //  alert('Login incorrecto');
    //}
  }
}
