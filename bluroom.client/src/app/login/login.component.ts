import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; 
  password: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  handleButtonClick() {
    this.onLogin();
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso', response);
        this.onLoginSuccess(response); 
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales inválidas. Por favor, inténtalo de nuevo.'); 
      }
    });
  }

  onLoginSuccess(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    this.router.navigate(['/inicio']);
  }
}
