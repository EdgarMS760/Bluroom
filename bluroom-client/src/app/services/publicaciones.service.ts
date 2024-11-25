import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, lastValueFrom } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private baseUrl = 'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT_ID.appspot.com/o/';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  async crearPublicacion(
    subgrupoId: number,
    usuarioId: number,
    usuarioNombre: string,
    mensaje: string,
    archivos: File[]
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

    const nuevaPublicacion = {
      subgrupoId,
      usuarioId,
      usuarioNombre,
      mensaje,
      archivos: urlsArchivos,
      fecha: new Date(), 
    };

    try {
      await this.firestore.collection('publicaciones').add(nuevaPublicacion);
      console.log('Publicación creada con éxito:', nuevaPublicacion);
    } catch (error) {
      console.error('Error al guardar la publicación:', error);
      throw new Error('No se pudo crear la publicación.');
    }
  }

  subirArchivo(file: File): Promise<string> {
    const filePath = `publicaciones/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Retornar la URL del archivo subido
    return new Promise((resolve, reject) => {
      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe({
              next: (url) => resolve(url),
              error: (error) => reject(error),
            });
          })
        )
        .subscribe();
    });
  }

  getPublicacionesPorSubgrupo(subgrupoId: number): Observable<any[]> {
    return this.firestore.collection('publicaciones', ref =>
      ref.where('subgrupoId', '==', subgrupoId).orderBy('fecha', 'desc')
    ).snapshotChanges();
  }

  async getPublicacionesPorSubgrupoUnaVez(subgrupoId: number): Promise<any[]> {
    const publicacionesSnapshot = await this.firestore.collection('publicaciones', ref =>
      ref.where('subgrupoId', '==', subgrupoId).orderBy('fecha', 'desc')
    ).get().toPromise();

    if (!publicacionesSnapshot || publicacionesSnapshot.empty) {
      return [];
    }

    return publicacionesSnapshot.docs.map(doc => doc.data());
  }
}
