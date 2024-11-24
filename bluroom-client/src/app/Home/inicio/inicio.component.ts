import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  groups: { name: string, id: number }[] = [];
  newGroupName: string = '';
  userId: number = 0;
  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.userId = user?.id;

    if (this.userId) {
      this.groupService.getGroupsByUserId(this.userId).subscribe(
        (response) => {
          this.groups = response.map(grupo => ({ name: grupo.nombre, id: grupo.grupo_Id }));
        },
        (error) => {
          console.error('Error al obtener los grupos:', error);
        }
      );
    }
  }

  createGroup(): void {
    if (this.newGroupName.trim() && this.userId) {
      this.groupService.createGroup(this.newGroupName, this.userId).subscribe(
        (response) => {
          this.groups.push({ name: this.newGroupName, id: response.grupo_Id });
          this.newGroupName = '';
        },
        (error) => {
          console.error('Error al crear el grupo:', error);
        }
      );
    }
  }
}
