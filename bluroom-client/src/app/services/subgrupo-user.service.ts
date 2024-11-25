import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storageFB.service';

export interface Alumno {
  id: number;
  nombre: string;
  fotoUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class SubgrupoUserService {

  private baseUrl = `${environment.apiUrl}/subgroupuser`; 

  constructor(private http: HttpClient, private storageService: StorageService) { }
 

  getUsuariosBySubgrupoId(subgrupoId: number): Observable<Alumno[]> {
    const url = `${this.baseUrl}/index/${subgrupoId}`;
    return this.http.get<any[]>(url).pipe(
      mergeMap((usuarios) => {
        const usuariosConUrls$ = usuarios.map(usuario =>
          this.getImageUrl(usuario.avatar).pipe(
            map((fotoUrl) => ({
              id: usuario.usuarioId,
              nombre: usuario.usuarioNombre,
              fotoUrl
            })) 
          )
        );
        return forkJoin(usuariosConUrls$);
      })
    );
  }
  getUsuariosNoEnSubgrupo(subgrupoId: number): Observable<{ id: number, nombre: string }[]> {
    return this.http.get<{ avatar: string, usuarioNombre: string, usuario_Id: number }[]>(
      `${this.baseUrl}/NOindex/${subgrupoId}`
    ).pipe(
      map(usuarios =>
        usuarios.map(usuario => ({
          id: usuario.usuario_Id, 
          nombre: usuario.usuarioNombre 
        }))
      )
    );
  }

  agregarUsuario(subgrupoId: number, userId: number): Observable<any> {
    const data = {
      SubgrupoId: subgrupoId,
      UserId: userId
    };

    return this.http.post<any>(`${this.baseUrl}/create`, data);
  }

  getImageUrl(avatar: string) {
    return this.storageService.getDownloadURL('avatar/' + avatar + '.png');
  }
}
