// src/app/services/storage.service.ts
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  getDownloadURL(filePath: string): Observable<string> {
    const ref = this.storage.ref(filePath);
    return ref.getDownloadURL();
  }

}
