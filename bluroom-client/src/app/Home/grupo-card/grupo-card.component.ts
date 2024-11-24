import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo-card',
  templateUrl: './grupo-card.component.html',
  styleUrl: './grupo-card.component.css'
})
export class GrupoCardComponent {
  @Input() groupName: string = '';
  @Input() groupId: number = 0;
  constructor(private router: Router) { }


  navigateToGroup() {
    this.router.navigate([`/muro/${this.groupId}`]);
  }
}
