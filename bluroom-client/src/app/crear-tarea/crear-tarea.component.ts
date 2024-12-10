import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { Subgrupo, SubGroupService, SubGroupResponse } from '../services/sub-group.service';

interface Grupo {
  nombre: string;
  id: number;
  subgrupos: Subgrupo[]; // Agregar subgrupos a la interfaz Grupo
}

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {
  tareaTitulo: string = '';
  tareaDescripcion: string = '';
  userId: number = 0;
  grupos: Grupo[] = [];
  grupoSeleccionado: Grupo | null = null; // Cambiar a tipo Grupo
  subgrupoSeleccionado: Subgrupo | null = null; // Cambiar a tipo Subgrupo
  fechaVencimiento: string = '';
  subgrupos: Subgrupo[] = []; // Asegúrate de que esta propiedad esté definida

  constructor(
    private router: Router,
    private groupService: GroupService,
    private subGroupService: SubGroupService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userId = user?.id;

    // Si se obtiene el userId, hacer la solicitud para obtener los grupos
    if (this.userId) {
      this.groupService.getGroupsByUserId(this.userId).subscribe(
        (data) => {
          this.grupos = data.map(grupo => ({
            nombre: grupo.nombre,
            id: grupo.grupo_Id,
            subgrupos: [] // Inicializar subgrupos como un array vacío
          }));
        },
        (error) => {
          console.error('Error al obtener los grupos:', error);
        }
      );
    }
  }

  // Cargar los subgrupos correspondientes al grupo seleccionado desde el servicio
  cargarSubgrupos(groupId: number | undefined): void {
    if (!groupId) return; // No hacemos nada si el ID es indefinido o nulo

    this.subGroupService.getSubgroupsByGroupId(groupId).subscribe(
      (response) => {
        const selectedGroup = this.grupos.find(grupo => grupo.id === groupId);
        if (selectedGroup) {
          selectedGroup.subgrupos = response.subgrupos.map(subgrupo => ({
            subgrupoId: subgrupo.subgrupoId,
            nombre: subgrupo.nombre,
            fechaCreacion: subgrupo.fechaCreacion // Asegúrate de tener este campo en el API
          }));
          this.subgrupoSeleccionado = selectedGroup.subgrupos.length > 0 ? selectedGroup.subgrupos[0] : null;
        }
      },
      (error) => {
        console.error('Error al cargar los subgrupos:', error);
        if (this.grupoSeleccionado) {
          this.grupoSeleccionado.subgrupos = [];
        }
      }
    );
  }


  // Función para crear la tarea
  crearTarea(): void {
    if (this.tareaTitulo && this.tareaDescripcion && this.grupoSeleccionado && this.subgrupoSeleccionado) {
      console.log('Tarea creada con éxito:');
      console.log('Título:', this.tareaTitulo);
      console.log('Descripción:', this.tareaDescripcion);
      console.log('Grupo:', this.grupoSeleccionado.nombre);
      console.log('Subgrupo:', this.subgrupoSeleccionado.nombre);

      // Aquí podrías enviar los datos a un servicio para guardarlos en la base de datos

      // Redirigir a la lista de tareas después de crearla
      this.router.navigate(['/tareas']);
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
