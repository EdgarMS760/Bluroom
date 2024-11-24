import { Component, OnInit } from '@angular/core';
import { getStorage, ref, getDownloadURL } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StorageService } from '../services/storageFB.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  usuario: any = null;
  avatar$: Observable<string> = new Observable();

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {

    const storedUser = localStorage.getItem('usuario');

    if (storedUser) {
      this.usuario = JSON.parse(storedUser);
      //this.getImageUrl(this.usuario.avatar);
    }

  
  }
  getImageUrl(avatar : string) {
    this.avatar$ = this.storageService.getDownloadURL('avatar/' + avatar + '.png');
  }
}
