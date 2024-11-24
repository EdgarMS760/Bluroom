import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  @Input() subgrupos: string[] = [];

  isCollapsed = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  addSubgrupo() {
    const nuevoSubgrupo = `Subgrupo ${this.subgrupos.length + 1}`;
    this.subgrupos.push(nuevoSubgrupo);
  }
}
