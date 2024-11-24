import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Subgrupo {
  subgrupoId: number;
  nombre: string;
  fechaCreacion: string;
}

export interface SubGroupResponse {
  grupoId: number;
  nombre: string;
  subgrupos: Subgrupo[];
}
export interface CreateSubgroupRequest {
  grupoId: number;
  nombre: string;
}

export interface CreateSubgroupResponse {
  subgrupoId: number;
  nombre: string;
  fechaCreacion: string;
  grupoId: number;
}
@Injectable({
  providedIn: 'root'
})
export class SubGroupService {
  private baseUrl = `${environment.apiUrl}/subgroup`;

  constructor(private http: HttpClient) { }

  getSubgroupsByGroupId(groupId: number): Observable<SubGroupResponse> {
    return this.http.get<SubGroupResponse>(`${this.baseUrl}/index/${groupId}`);
  }
  createSubgroup(request: CreateSubgroupRequest): Observable<CreateSubgroupResponse> {
    return this.http.post<CreateSubgroupResponse>(`${this.baseUrl}/create`, request);
  }
}
