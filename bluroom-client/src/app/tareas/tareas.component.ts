import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { SubGroupResponse, SubGroupService } from '../services/sub-group.service';

interface Grupo {
  nombre: string;
  seleccionado: boolean;
  subgrupos: { nombre: string, id: number }[]; // Subgrupos con nombre e ID
  id: number;
}

interface Tarea {
  titulo: string;
  grupo: string;
  subgrupo: string;
  descripcion: string;
  estado: string;
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent {

  userId: number = 0;  // Variable para almacenar el ID del usuario
  grupos: Grupo[] = []; // Lista de grupos para el componente

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userId = user?.id;

    // Si se obtiene el userId, hacer la solicitud para obtener los grupos
    if (this.userId) {
      this.groupService.getGroupsByUserId(this.userId).subscribe(
        (data) => {
          // Mapear los grupos recibidos y asignarlos a 'this.grupos'
          this.grupos = data.map(grupo => ({ nombre: grupo.nombre, seleccionado: false, subgrupos: [], id: grupo.grupo_Id }));
        },
        (error) => {
          console.error('Error al obtener los grupos:', error);
        }
      );
    }
  }

  tareas: Tarea[] = [
    { titulo: 'Práctica - Proyecto Final', grupo: 'LMAD', subgrupo: 'Subgrupo 1', descripcion: 'Descripción de la tarea...', estado: 'pendiente'},
    { titulo: 'Práctica 1 - Diseño Ventanas', grupo: 'LMAD', subgrupo: 'Subgrupo 1', descripcion: 'Descripción de la tarea...', estado: 'pendiente'},
    { titulo: 'Práctica 2 - Diseño Ventanas', grupo: 'LMAD', subgrupo: 'Subgrupo 2', descripcion: 'Descripción de la tarea...', estado: 'completada'},
    { titulo: 'Práctica 3 - Diseño Ventanas', grupo: 'OTRO', subgrupo: 'Subgrupo 1', descripcion: 'Descripción de la tarea...', estado: 'pendiente'}
  ];

  subgrupoSeleccionado: string = '';

  estadoSeleccionado: string = 'pendientes';

  tareasFiltradas: Tarea[] = [];

  constructor(private router: Router, private groupService: GroupService,
    private subGroupService: SubGroupService) {
  }
  
  seleccionarGrupo(grupo: Grupo) {
    this.grupos.forEach(g => g.seleccionado = false);
    grupo.seleccionado = true;
    this.loadSubgroups(grupo.id, grupo);
    this.filtrarTareas();
  }

  seleccionarSubgrupo(subgrupo: string) {
    this.subgrupoSeleccionado = subgrupo;
    this.filtrarTareas();
  }

  seleccionarEstado(estado: string) {
    this.estadoSeleccionado = estado;
    this.filtrarTareas();
  }

  filtrarTareas() {
    const grupoSeleccionado = this.grupos.find(g => g.seleccionado);
    if (!grupoSeleccionado) {
      this.tareasFiltradas = [];
      return;
    }
    const tareasFiltradas = this.tareas.filter(tarea => {
      return tarea.grupo === grupoSeleccionado.nombre &&
        tarea.subgrupo === this.subgrupoSeleccionado &&
        (this.estadoSeleccionado === 'pendientes' ? tarea.estado === 'pendiente' : tarea.estado === 'completada');
    });
    this.tareasFiltradas = tareasFiltradas;
  }

  verDetalle(tarea: Tarea) {
    this.router.navigate(['/tarea-descripcion']);
  }

  crearTarea() {
    this.router.navigate(['/crear-tarea']);
  }

  loadSubgroups(groupId: number, grupo: Grupo): void {
    this.subGroupService.getSubgroupsByGroupId(groupId).subscribe(
      (response: SubGroupResponse) => {
        grupo.subgrupos = response.subgrupos.map(subgrupo => ({
          nombre: subgrupo.nombre,
          id: subgrupo.subgrupoId
        }));
        // Seleccionar el primer subgrupo si existe
        this.subgrupoSeleccionado = grupo.subgrupos.length > 0 ? grupo.subgrupos[0].nombre : '';
        this.filtrarTareas();
      },
      (error) => {
        console.error('Error al cargar los subgrupos:', error);
        grupo.subgrupos = []; // Limpiar subgrupos en caso de error
      }
    );
  }

}
