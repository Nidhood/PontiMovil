import { Component } from '@angular/core';
import {BehaviorSubject, finalize, map, Observable} from 'rxjs';
import {RRutaRecibidaDto} from '../../dto/gestionar-rutas/ruta-recibida/r-ruta-recibida-dto';
import {GestionarRutasService} from '../../share/gestionar-rutas.service';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import {RModuloRutaComponent} from '../r-modulo-ruta/r-modulo-ruta.component';
import {RDetallesRutaComponent} from '../r-detalles-ruta/r-detalles-ruta.component';
import {RBuscarRutaComponent} from '../r-buscar-ruta/r-buscar-ruta.component';
import {REditarRutaComponent} from '../r-editar-ruta/r-editar-ruta.component';
import {Button} from 'primeng/button';
import {RAgregarRutaComponent} from '../r-agregar-ruta/r-agregar-ruta.component';
import {RModuloAgregarRutaComponent} from '../r-modulo-agregar-ruta/r-modulo-agregar-ruta.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {RRutaEnviadaDto} from '../../dto/gestionar-rutas/ruta-enviada/r-ruta-enviada-dto';

@Component({
  selector: 'app-r-menu',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    AsyncPipe,
    NgForOf,
    LottieComponent,
    RModuloRutaComponent,
    RDetallesRutaComponent,
    RBuscarRutaComponent,
    REditarRutaComponent,
    Button,
    RAgregarRutaComponent,
    RModuloAgregarRutaComponent,
    ToastModule
  ],
  templateUrl: './r-menu.component.html',
  styleUrl: './r-menu.component.css',
  providers: [MessageService, ConfirmationService]
})

export class RMenuComponent {
  private rutasSubject = new BehaviorSubject<RRutaRecibidaDto[]>([]);
  rutas$: Observable<RRutaRecibidaDto[]> = this.rutasSubject.asObservable();
  selectedRuta: RRutaRecibidaDto | null = null;
  editRuta: RRutaRecibidaDto | null = null;
  agregarRuta = false;
  guiaVisible = false;
  isLoading = true;

  constructor(
    private gestionarRutasService: GestionarRutasService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cargarRutas();
  }

  onSearch(searchTerm: string) {
    this.rutas$ = this.rutasSubject.pipe(
      map(rutas => rutas.filter(ruta =>
        ruta.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ruta.estaciones.some(estacion =>
          estacion.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ))
    );
  }

  seleccionarRuta(ruta: RRutaRecibidaDto) {
    this.selectedRuta = ruta;
  }

  cerrarDetalles() {
    this.selectedRuta = null;
  }

  mostrarGuia() {
    this.guiaVisible = true;
  }

  cerrarGuia() {
    this.guiaVisible = false;
  }

  cerrarModal() {
    this.selectedRuta = null;
    this.guiaVisible = false;
  }

  editarRuta() {
    this.editRuta = this.selectedRuta;
    this.selectedRuta = null;
  }

  cerrarEditar() {
    this.editRuta = null;
    this.guiaVisible = false;
  }

  cerrarAgregar() {
    this.agregarRuta = false;
  }

  cargarRutas() {
    this.isLoading = true;
    this.gestionarRutasService.listaRutas().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      (rutas: RRutaRecibidaDto[]) => {
        this.rutasSubject.next(rutas);
        this.messageService.add({severity: 'success', summary: 'Rutas cargadas', detail: 'Las rutas se han cargado correctamente'});

      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error al cargar rutas', detail: error});
      }
    );
  }

  guardarNuevaRuta($event: RRutaEnviadaDto) {
    this.gestionarRutasService.crearRuta($event).subscribe(
      () => {
        this.cargarRutas();
        this.cerrarAgregar();
      },
      error => console.error('Error al guardar la nueva ruta:', error)
    );
  }

  guardarCambiosRuta($event: RRutaEnviadaDto) {
    this.gestionarRutasService.actualizarRuta($event).subscribe(
      () => {
        this.cargarRutas();
        this.cerrarEditar();
      },
      error => console.error('Error al actualizar la ruta:', error)
    );
  }

  abrirFormulario() {
    this.agregarRuta = true;
  }

  options: AnimationOptions = {
    path: '/assets/animations/loading.json'
  };
}
