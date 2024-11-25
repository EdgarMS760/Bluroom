import { Component } from '@angular/core';
import { Alumno } from '../lista-alumnos/alumno.model';
import { SubGroupResponse, SubGroupService } from '../services/sub-group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrl: './muro.component.css'
})
export class MuroComponent {
  listaDeAlumnos: Alumno[] = [
    { id: 1, nombre: 'Edgar Martinez', fotoUrl: 'https://picsum.photos/200' },
    { id: 2, nombre: 'Jesus De La Cruz', fotoUrl: 'https://picsum.photos/200' },
    { id: 3, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' },
    { id: 4, nombre: 'Edgar Martinez', fotoUrl: 'https://picsum.photos/200' },
    { id: 5, nombre: 'Jesus De La Cruz', fotoUrl: 'https://picsum.photos/200' },
    { id: 6, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' },
    { id: 7, nombre: 'Edgar Martinez', fotoUrl: 'https://picsum.photos/200' },
    { id: 8, nombre: 'Jesus De La Cruz', fotoUrl: 'https://picsum.photos/200' },
    { id: 9, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' },
    { id: 10, nombre: 'Edgar Martinez', fotoUrl: 'https://picsum.photos/200' },
    { id: 11, nombre: 'Jesus De La Cruz', fotoUrl: 'https://picsum.photos/200' },
    { id: 12, nombre: 'Gael Reyes', fotoUrl: 'https://picsum.photos/200' }
  ];
  mensajesEnviado: string[] = ['hola grupo', 'el proyecto se entrega la siguiente semana'];
  mensajesRecibido: string[] = ['enterado', 'como asi?'];
  grupoId: number = 0;
  grupoText: string = '';
  subgrupos: { id: number, nombre: string }[] = [];
  isMuroVisible: boolean = false;  
  subgrupoSeleccionado: { id: number, nombre: string } = { id: 0, nombre: '' };

  constructor(
    private route: ActivatedRoute,
    private subGroupService: SubGroupService
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
