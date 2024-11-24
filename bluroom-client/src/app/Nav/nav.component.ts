import { Component, OnInit } from '@angular/core';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  usuario: any = null;
  avatar: string = ""
  constructor(private storage: AngularFireStorage) { }
  ngOnInit(): void {

    const storedUser = localStorage.getItem('usuario');

    if (storedUser) {
      this.usuario = JSON.parse(storedUser);
    }
    const storage = getStorage();
    const imageRef = ref(storage, 'avatar/avatar1.webp'); // Ruta de la imagen en Firebase

    getDownloadURL(imageRef)
      .then((url) => {
        this.avatar = url;
      })
      .catch((error) => {
        console.error('Error al obtener la URL:', error);
      });
  
  }
}
