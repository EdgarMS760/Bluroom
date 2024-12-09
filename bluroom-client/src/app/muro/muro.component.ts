import { Component } from '@angular/core';
import { Alumno } from '../lista-alumnos/alumno.model';
import { SubGroupResponse, SubGroupService } from '../services/sub-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubgrupoUserService } from '../services/subgrupo-user.service';
import { PublicacionesService } from '../services/publicaciones.service';
import { ChatService } from '../services/chat.service';
declare var bootstrap: any;

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrl: './muro.component.css'
})
export class MuroComponent {
  listaDeAlumnos: Alumno[] = [];
  alumnoSeleccionado: Alumno | null = null;
  publicaciones: any[] = [];
  usuarioActivo: any;
  grupoId: number = 0;
  grupoText: string = '';
  subgrupos: { id: number, nombre: string }[] = [];
  isMuroVisible: boolean = false;
  subgrupoSeleccionado: { id: number, nombre: string } = { id: 0, nombre: '' };
  archivos: File[] = [];
  mensaje: string = '';
  constructor(
    private route: ActivatedRoute,
    private subGroupService: SubGroupService,
    private subgrupoUserService: SubgrupoUserService,
    private publicacionesService: PublicacionesService,
    private chatService: ChatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.grupoId = Number(this.route.snapshot.paramMap.get('idgrupo'));

    if (this.grupoId) {
      this.loadSubgroups(this.grupoId);
    } else {
      console.error('ID del grupo no encontrado en la URL');
    }
  }

  seleccionarArchivo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '*';

    input.onchange = (event: any) => {
      const seleccionados = Array.from(event.target.files) as File[];
      this.archivos = this.archivos.concat(seleccionados);
    };

    input.click();
  }
  async enviarMensaje() {
    if (!this.mensaje.trim() && this.archivos.length === 0) {
      console.log('No hay contenido para enviar.');
      return;
    }

    try {
      const usuarioData = localStorage.getItem('usuario');
      if (!usuarioData) {
        console.error('No se encontró información del usuario en localStorage.');
        return;
      }

      const usuario = JSON.parse(usuarioData);
      const subgrupoId = this.subgrupoSeleccionado.id;
      const usuarioId = usuario.id;
      const usuarioNombre = usuario.nombre;

      await this.publicacionesService.crearPublicacion(
        subgrupoId,
        usuarioId,
        usuarioNombre,
        this.mensaje,
        this.archivos
      );

      console.log('Publicación creada con éxito.');
      this.mensaje = '';
      this.archivos = [];
    } catch (error) {
      console.error('Error al crear la publicación:', error);
    }
  }

  eliminarArchivo(index: number) {
    this.archivos.splice(index, 1);
  }
  mostrarMuro(subgrupo: { id: number, nombre: string }) {
    this.subgrupoSeleccionado = subgrupo;
    this.isMuroVisible = true;
    this.loadUserBySubgrupo(subgrupo);

    const usuarioLocalStorage = localStorage.getItem('usuario');
    if (usuarioLocalStorage) {
      this.usuarioActivo = JSON.parse(usuarioLocalStorage);
    }

    this.cargarPublicaciones(this.subgrupoSeleccionado.id);
  }
  loadUserBySubgrupo(subgrupo: { id: number, nombre: string }) {
    const usuarioLocal = localStorage.getItem('usuario');
    let usuarioId = null;

    if (usuarioLocal) {
      try {
        usuarioId = JSON.parse(usuarioLocal).id; // Obtener el ID del usuario desde el localStorage
      } catch (error) {
        console.error('Error al parsear usuario desde localStorage:', error);
      }
    }

    this.subgrupoUserService.getUsuariosBySubgrupoId(subgrupo.id)
      .subscribe(
        (data) => {
          if (usuarioId !== null) {
            this.listaDeAlumnos = data.filter(usuario => usuario.id !== usuarioId);
          } else {
            this.listaDeAlumnos = data;
          }

          if (this.listaDeAlumnos.length === 0) {
            console.log('No hay alumnos en este subgrupo');
          }

          console.log(this.listaDeAlumnos);
        },
        (error) => {
          console.log('Error al obtener los usuarios:', error);
          this.listaDeAlumnos = [];
        }
      );
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

  cargarPublicaciones(subgrupoId: number): void {
    this.publicacionesService.getPublicacionesPorSubgrupo(subgrupoId)
      .subscribe(publicacionesSnapshot => {
        const publicaciones = publicacionesSnapshot.map(doc => {
          const data = doc.payload.doc.data() as any;
          const id = doc.payload.doc.id;

          const fecha = data.fecha?.seconds
            ? new Date(data.fecha.seconds * 1000)
            : data.fecha;

          return { id, ...data, fecha };
        });

        this.publicaciones = publicaciones.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
      });
  }

  onAlumnoSeleccionado(alumno: Alumno) {
    this.alumnoSeleccionado = alumno;
    this.iniciarChat();
  }
  iniciarChat(): void {
    if (this.alumnoSeleccionado) {
      const usuarioId = JSON.parse(localStorage.getItem('usuario') || '{}').id;

      this.chatService.createChat(usuarioId, this.alumnoSeleccionado.id).subscribe(
        response => {
          console.log('Chat iniciado con éxito:', response);


          this.router.navigate(['/mensajes']);
        },
        error => {
          console.error('Error al iniciar el chat:', error);
        }
      );
    }
  }
}
