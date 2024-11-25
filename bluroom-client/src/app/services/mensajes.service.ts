import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  // Método para subir archivos
  private subirArchivo(file: File): Promise<string> {
    const filePath = `chats/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Promise((resolve, reject) => {
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe({
              next: (url) => resolve(url),
              error: (error) => reject(error)
            });
          })
        )
        .subscribe();
    });
  }

  async crearMensaje(
    chatId: string,
    usuarioId: string,
    nombre: string,
    contenido: string,
    archivos: File[] = []
  ): Promise<void> {
    const urlsArchivos: string[] = [];

    if (archivos.length > 0) {
      for (const archivo of archivos) {
        try {
          const url = await this.subirArchivo(archivo);
          urlsArchivos.push(url);
        } catch (error) {
          console.error('Error al subir archivo:', error);
          throw new Error('No se pudo completar la subida de archivos.');
        }
      }
    }

    const nuevoMensaje = {
      chatId,
      contenido,
      usuarioId,
      nombre,
      fecha: new Date(),
      archivos: urlsArchivos, 
    };

    try {
      await this.firestore.collection('chats').add(nuevoMensaje);
      console.log('Mensaje creado con éxito:', nuevoMensaje);
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
      throw new Error('No se pudo crear el mensaje.');
    }
  }
  getMensajesPorChat(chatId: number): Observable<any[]> {
    return this.firestore.collection('chats', ref =>
      ref.where('chatId', '==', chatId).orderBy('fecha', 'asc')
    ).snapshotChanges();
  }
}
