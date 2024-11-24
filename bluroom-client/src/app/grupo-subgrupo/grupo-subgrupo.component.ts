import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SubGroupService } from '../services/sub-group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grupo-subgrupo',
  templateUrl: './grupo-subgrupo.component.html',
  styleUrls: ['./grupo-subgrupo.component.css'],
  animations: [
    trigger('collapseAnimation', [
      state('collapsed', style({
        height: '0px',
        overflow: 'hidden'
        
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class GrupoSubgrupoComponent {
  @Input() grupoText: string = 'Grupo';
  @Input() grupoId: number = 0; // Agregado para el ID del grupo
  @Input() subgrupos: { id: number; nombre: string }[] = [];
  isModalOpen: boolean = false;
  newSubgrupoName: string = '';

  isCollapsed = true;
  constructor(private subGroupService: SubGroupService,
  
    private route: ActivatedRoute,) { }
  // Abrir modal


  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  createSubgrupo(): void {
    this.grupoId = Number(this.route.snapshot.paramMap.get('idgrupo'));
    if (this.newSubgrupoName.trim()) {
      const request = {
        grupoId: this.grupoId,
        nombre: this.newSubgrupoName.trim()
      };

      this.subGroupService.createSubgroup(request).subscribe(
        (response) => {
          this.subgrupos.push({ id: response.subgrupoId, nombre: response.nombre });

        },
        (error) => {
          console.error('Error al crear el subgrupo:', error);
        }
      );
    }
  }
}
