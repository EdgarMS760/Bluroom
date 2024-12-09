import { Component, OnInit } from '@angular/core';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StorageService } from '../services/storageFB.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  usuario: any = null;
  avatar$: Observable<string> = new Observable();
  status: true | false = false;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {

    const storedUser = localStorage.getItem('usuario');

    if (storedUser) {
      this.usuario = JSON.parse(storedUser);
      //this.getImageUrl(this.usuario.avatar);
    }
    this.loadUserStatus();

  }
  getImageUrl(avatar: string) {
    this.avatar$ = this.storageService.getDownloadURL('avatar/' + avatar + '.png');
  }
  setStatus(newStatus: true | false): void {
    this.status = newStatus;

    const userId = JSON.parse(localStorage.getItem('usuario') || '{}').id;
    this.authService.updateUserStatus(userId, this.status).then(() => {
      console.log('Estado del usuario actualizado');
    }).catch(error => {
      console.error('Error al actualizar el estado del usuario:', error);
      alert('No se pudo actualizar el estado del usuario. Por favor, intenta de nuevo.');
    });
  }
  loadUserStatus(): void {
    const userId = JSON.parse(localStorage.getItem('usuario') || '{}').id;
    this.authService.getUserStatus(String(userId)).subscribe({
      next: (data) => {
        this.status = data?.status || false;
      },
      error: (err) => {
        console.error('Error al cargar el estado del usuario:', err);
      }
    });
  }

}
