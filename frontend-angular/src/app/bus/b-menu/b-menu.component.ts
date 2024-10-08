import { Component } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';
import { GestionarBusesService } from '../../share/gestionar-buses.service';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { BModuloBusComponent } from '../b-modulo-bus/b-modulo-bus.component';
import { BDetallesBusComponent } from '../b-detalles-bus/b-detalles-bus.component';
import { BBuscarBusComponent } from '../b-buscar-bus/b-buscar-bus.component';
import { BEditarBusComponent } from '../b-editar-bus/b-editar-bus.component';
import { BAgregarBusComponent } from '../b-agregar-bus/b-agregar-bus.component';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs/operators';
import {BModuloAgregarBusComponent} from '../b-modulo-agregar-bus/b-modulo-agregar-bus.component';

@Component({
  selector: 'app-b-menu',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    LottieComponent,
    BModuloBusComponent,
    BDetallesBusComponent,
    BBuscarBusComponent,
    BEditarBusComponent,
    Button,
    BAgregarBusComponent,
    TableModule,
    BModuloAgregarBusComponent
  ],
  templateUrl: './b-menu.component.html',
  styleUrls: ['./b-menu.component.css']
})
export class BMenuComponent {
  private busesSubject = new BehaviorSubject<BusDTO[]>([]);
  buses$: Observable<BusDTO[]> = this.busesSubject.asObservable();
  selectedBus: BusDTO | null = null;
  editBus: BusDTO | null = null;
  agregarBus = false;
  guiaVisible = false;
  isLoading = true;

  // Definir la propiedad `options` para la animación
  options: AnimationOptions = {
    path: '/assets/animations/loading.json'  // Ruta de la animación JSON
  };

  constructor(private gestionarBusesService: GestionarBusesService) {}

  ngOnInit() {
    this.cargarBuses();
  }

  onSearch(searchTerm: string) {
    this.buses$ = this.busesSubject.pipe(
      map(buses => buses.filter(bus =>
        bus.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }

  seleccionarBus(bus: BusDTO) {
    this.selectedBus = bus;
  }

  cerrarDetalles() {
    this.selectedBus = null;
  }

  mostrarGuia() {
    this.guiaVisible = true;
  }

  cerrarGuia() {
    this.guiaVisible = false;
  }

  cerrarModal() {
    this.selectedBus = null;
    this.guiaVisible = false;
  }

  editarBus() {
    this.editBus = this.selectedBus;
    this.selectedBus = null;
  }

  cerrarEditar() {
    this.editBus = null;
    this.guiaVisible = false;
  }

  cerrarAgregar() {
    this.agregarBus = false;
  }

  abrirFormulario() {
    this.agregarBus = true;
  }

  cargarBuses() {
    this.isLoading = true;
    this.gestionarBusesService.listaBuses().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      (buses: BusDTO[]) => {
        this.busesSubject.next(buses);
      },
      error => {
        console.error('Error al cargar buses:', error);
      }
    );
  }

  guardarCambiosBus(busActualizado: BusDTO) {
    this.gestionarBusesService.actualizarBus(busActualizado).subscribe(
      () => {
        this.cargarBuses();
        this.cerrarEditar();
      },
      error => console.error('Error al guardar cambios:', error)
    );
  }

  guardarNuevoBus(busNuevo: BusDTO) {
    this.gestionarBusesService.crearBus(busNuevo).subscribe(
      () => {
        this.cargarBuses();
        this.cerrarAgregar();
      },
      error => console.error('Error al guardar el nuevo bus:', error)
    );
  }
}
