import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`; 

  constructor(private http: HttpClient, private firestore: AngularFirestore,) { }

  register(fullName: string, email: string, password: string): Observable<any> {
    const registroDto = { FullName: fullName, Email: email, Password: password };
    return this.http.post(`${this.baseUrl}/register`, registroDto);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      Email: email,
      Password: password
    });

  }
  logout(iduser : number): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {
      user_id: iduser
    });

  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  async createUserStatus(userId: number) {
    const nuevoUSer = {
      status: 0,
      fecha: new Date()
    };
    try {
      await this.firestore.collection('userStatus').doc(userId.toString()).set(nuevoUSer); 
      console.log('Usuario creado con éxito:', nuevoUSer);
    } catch (error) {
      console.error('Error al guardar el estado del usuario:', error);
      throw new Error('No se pudo crear el estado del usuario.');
    }
  }
  async updateUserStatus(userId: number, status: boolean): Promise<void> {
    try {
      await this.firestore.collection('userStatus').doc(userId.toString()).update({ status });
      console.log(`Estado del usuario ${userId} actualizado a: ${status}`);
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
      throw new Error('No se pudo actualizar el estado del usuario.');
    }
  }
  listenUserStatus(userId: string, callback: (status: boolean) => void): Subscription {
    const userDocRef = this.firestore.doc(`userStatus/${userId}`);
    const subscription = userDocRef.valueChanges().subscribe((docSnapshot: any) => {
      if (docSnapshot) {
        callback(docSnapshot.status);
      } else {
        console.warn('El documento no existe');
        callback(false);
      }
    });

    return subscription;
  }
  getUserStatus(userId: string): Observable<any> {
    return this.firestore
      .collection('userStatus')
      .doc(userId)
      .valueChanges();
  }

}
