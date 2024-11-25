import { Component } from '@angular/core';
import { Alumno } from '../lista-alumnos/alumno.model';
import { SubGroupResponse, SubGroupService } from '../services/sub-group.service';
import { ActivatedRoute } from '@angular/router';
import { SubgrupoUserService } from '../services/subgrupo-user.service';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrl: './muro.component.css'
})
export class MuroComponent {
  listaDeAlumnos: Alumno[] = [];
  mensajesEnviado: string[] = ['hola grupo', 'el proyecto se entrega la siguiente semana'];
  mensajesRecibido: string[] = ['enterado', 'como asi?'];
  grupoId: number = 0;
  grupoText: string = '';
  subgrupos: { id: number, nombre: string }[] = [];
  isMuroVisible: boolean = false;  
  subgrupoSeleccionado: { id: number, nombre: string } = { id: 0, nombre: '' };

  constructor(
    private route: ActivatedRoute,
    private subGroupService: SubGroupService,
    private subgrupoUserService: SubgrupoUserService
  ) { }

  ngOnInit(): void {
    this.grupoId = Number(this.route.snapshot.paramMap.get('idgrupo'));

    if (this.grupoId) {
      this.loadSubgroups(this.grupoId);
    } else {
      console.error('ID del grupo no encontrado en la URL');
    }

  }
  mostrarMuro(subgrupo: { id: number, nombre: string }) {
    this.subgrupoSeleccionado = subgrupo;
    this.isMuroVisible = true;
    //this.loadUserBySubgrupo(subgrupo);
  }
  loadUserBySubgrupo(subgrupo: { id: number, nombre: string }) {
    this.subgrupoUserService.getUsuariosBySubgrupoId(subgrupo.id)
      .subscribe(
        (data) => {
          this.listaDeAlumnos = data;
          console.log(this.listaDeAlumnos);
        },
        (error) => {
          console.log('Error al obtener los usuarios:', error);
        }
      );
  }
  loadSubgroups(groupId: number): void {
    this.subGroupService.getSubgroupsByGroupId(groupId).subscribe(
      (response: SubGroupResponse) => {
        this.grupoText = response.nombre;
        this.subgrupos = response.subgrupos.map(subgrupo => ({
          id: subgrupo.subgrupoId,
          nombre: subgrupo.nombre 
        }));
      },
      (error) => {
        console.error('Error al cargar los subgrupos:', error);
        this.subgrupos = [];
      }
    );
  }

  onAlumnoSeleccionado(alumno: Alumno) {
    console.log('Alumno seleccionado:', alumno);
  }
}
