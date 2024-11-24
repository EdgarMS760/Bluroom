import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface CrearGrupoDTO {
  Name: string;
  Id_user: number;
}
interface Grupo {
  grupo_Id: number;
  nombre: string;
  usuario_Id: number;
  fechaCreacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = `${environment.apiUrl}/group`; 

  constructor(private http: HttpClient) { }


  createGroup(name: string, idUser: number): Observable<any> {
    const body: CrearGrupoDTO = {
      Name: name,
      Id_user: idUser
    };

    return this.http.post(`${this.baseUrl}/create`, body);
  }
  getGroupsByUserId(idUser: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.baseUrl}/index/${idUser}`);
  }
}
