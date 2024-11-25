import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router, private authService: AuthService) { }

  activeLink: string = 'mensajes';

  setActiveLink(link: string) {
    this.activeLink = link;
  }
  logout(): void {
    this.onLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }
  onLogout() {
    const usuarioId = JSON.parse(localStorage.getItem('usuario') || '{}').id;
    this.authService.logout(usuarioId).subscribe({
      next: (response) => {
        console.log('cierre de sesión exitoso', response);
      },
      error: (error) => {
        console.error('Error al cambiar status', error);
     
      }
    });
  }
}
