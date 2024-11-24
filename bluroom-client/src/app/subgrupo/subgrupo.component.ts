import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subgrupo',
  templateUrl: './subgrupo.component.html',
  styleUrls: ['./subgrupo.component.css']
})
export class SubgrupoComponent {
  @Input() subgrupoText: string = '';

  handleButtonClick() {

  }
}
