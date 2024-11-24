import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  fullname: string = '';
  password: string = '';
  password2: string = '';
  email: string = '';
  loading: boolean = false;
  constructor(private router: Router, private authService: AuthService) { }

  handleButtonClick() {
    this.onRegister();
  }
  onRegister() {
    if (this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.loading = true; 
    this.authService.register(this.fullname, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar', error);
        alert('Error al registrar: ' + error.error);
      },
      complete: () => {
        this.loading = false; 
      }
    });
  }
}
