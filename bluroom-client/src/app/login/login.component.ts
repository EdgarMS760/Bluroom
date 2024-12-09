import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
        this.authService.saveToken(response.token);
        this.onLoginSuccess(response); 
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales inválidas. Por favor, inténtalo de nuevo.'); 
      }
    });
  }

  onLoginSuccess(response: any) {
    localStorage.setItem('usuario', JSON.stringify(response.usuario));
    const userId = response.usuario.id;
    this.authService.updateUserStatus(userId, true).then(() => {
      console.log('Estado del usuario actualizado a activo');
      this.router.navigate(['/inicio']); 
    }).catch(error => {
      console.error('Error al actualizar el estado del usuario:', error);
      alert('No se pudo actualizar el estado del usuario. Por favor, intenta de nuevo.');
    });
  }

}
