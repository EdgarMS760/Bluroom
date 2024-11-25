import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subgrupo-header',
  templateUrl: './subgrupo-header.component.html',
  styleUrl: './subgrupo-header.component.css'
})
export class SubgrupoHeaderComponent {
  @Input() nombreSubgrupo: string = '';
  @Input() idSubgrupo: number = 0;
 
  searchQuery: string = '';
  usuarios: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' },
    { id: 4, nombre: 'Ana Gómez' },
  ];
  filteredUsuarios: { id: number, nombre: string }[] = [];
  selectedUsuarios: { id: number, nombre: string }[] = []; 
  onSearchInput(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredUsuarios = [];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(query)
    );
  }

  toggleSelection(usuario: { id: number, nombre: string }): void {
    const index = this.selectedUsuarios.findIndex(u => u.id === usuario.id);
    if (index === -1) {
      this.selectedUsuarios.push(usuario);
    } else {
      this.selectedUsuarios.splice(index, 1);
    }
  }
  isSelected(usuario: { id: number, nombre: string }): boolean {
    return this.selectedUsuarios.some(u => u.id === usuario.id);
  }

  agregarUsuario(): void {
    console.log('Subgrupo ID:', this.idSubgrupo);
    console.log('Usuarios seleccionados:', this.selectedUsuarios);
  }
  
}
