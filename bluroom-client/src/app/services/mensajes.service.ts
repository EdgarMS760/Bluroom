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
  async iniciarVideollamada(chatId: string, usuarioId: string, nombre: string): Promise<void> {
  if (!chatId) throw new Error("El ID del chat (chatId) no está definido.");
  if (!usuarioId) throw new Error("El ID del usuario (usuarioId) no está definido.");
  if (!nombre) throw new Error("El nombre del usuario (nombre) no está definido.");

  const estadoLlamada = {
    chatId,
    usuarioId,
    nombre,
    activa: true,
    fechaInicio: new Date(),
  };

  try {
    await this.firestore.collection('videollamadas').doc(chatId).set(estadoLlamada);
    console.log('Estado de la videollamada guardado en Firebase.');
  } catch (error) {
    console.error('Error al registrar la videollamada en Firebase:', error);
    throw error;
  }
}

  async finalizarVideollamada(chatId: string): Promise<void> {
    try {
      await this.firestore.collection('videollamadas').doc(chatId).update({ activa: false, fechaFin: new Date() });
      console.log('Videollamada finalizada');
    } catch (error) {
      console.error('Error al finalizar la videollamada:', error);
      throw new Error('No se pudo finalizar la videollamada.');
    }
  }

  getEstadoVideollamada(chatId: string): Observable<{ activa: boolean }> {
    return this.firestore
      .collection('videollamadas')
      .doc(chatId)
      .valueChanges() as Observable<{ activa: boolean }>;
  }



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
