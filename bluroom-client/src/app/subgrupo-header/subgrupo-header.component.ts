import { Component, Input } from '@angular/core';
import { SubgrupoUserService } from '../services/subgrupo-user.service';

@Component({
  selector: 'app-subgrupo-header',
  templateUrl: './subgrupo-header.component.html',
  styleUrl: './subgrupo-header.component.css'
})
export class SubgrupoHeaderComponent {
  @Input() nombreSubgrupo: string = '';
  @Input() idSubgrupo: number = 0;
  constructor(private subgrupoUserService: SubgrupoUserService) { }
  searchQuery: string = '';
  usuarios: { id: number, nombre: string }[] = [
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
  ngOnInit(): void {
    if (this.idSubgrupo) {
      this.loadUsuariosNoEnSubgrupo();
    }
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

    this.selectedUsuarios.forEach(usuario => {
      this.subgrupoUserService.agregarUsuario(this.idSubgrupo, usuario.id).subscribe({
        next: (response) => {
          console.log(`Usuario ${usuario.nombre} agregado correctamente.`, response);
        },
        error: (err) => {
          console.error(`Error al agregar usuario ${usuario.nombre}`, err);
        }
      });
    });
  }
  loadUsuariosNoEnSubgrupo(): void {
    this.subgrupoUserService.getUsuariosNoEnSubgrupo(this.idSubgrupo).subscribe({
      next: (usuarios) => {
       
        this.usuarios = usuarios.map(usuario => ({
          id: usuario.id,  
          nombre: usuario.nombre,  
        }));
        console.log('Usuarios obtenidos:', this.usuarios);  
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      }
    });
  }
}
