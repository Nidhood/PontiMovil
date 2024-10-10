import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';
import { GestionarBusesService } from '../../share/gestionar-buses.service';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { BDetallesBusComponent } from '../b-detalles-bus/b-detalles-bus.component';
import { BBuscarBusComponent } from '../b-buscar-bus/b-buscar-bus.component';
import { BEditarBusComponent } from '../b-editar-bus/b-editar-bus.component';
import { BAgregarBusComponent } from '../b-agregar-bus/b-agregar-bus.component';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs/operators';
import { BModuloAgregarBusComponent } from '../b-modulo-agregar-bus/b-modulo-agregar-bus.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';  // Importar MessageService y ConfirmationService

@Component({
  selector: 'app-b-menu',
  standalone: true,
  providers: [MessageService, ConfirmationService],  // Proveedor de servicios
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    LottieComponent,
    BDetallesBusComponent,
    BBuscarBusComponent,
    BEditarBusComponent,
    Button,
    BAgregarBusComponent,
    TableModule,
    BModuloAgregarBusComponent,
    ConfirmDialogModule
  ],
  templateUrl: './b-menu.component.html',
  styleUrls: ['./b-menu.component.css']
})
export class BMenuComponent implements OnInit {
  private busesSubject = new BehaviorSubject<BusDTO[]>([]);
  buses$: Observable<BusDTO[]> = this.busesSubject.asObservable();
  selectedBus: BusDTO | null = null;
  editBus: BusDTO | null = null;
  agregarBus = false;
  isLoading = true;

  options: AnimationOptions = {
    path: '/assets/animations/loading.json'  // Ruta de la animación JSON
  };

  iconLoaded = false;

  constructor(
    private gestionarBusesService: GestionarBusesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService  // Inyectar el servicio de confirmación
  ) {}

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

  editarBus() {
    this.editBus = this.selectedBus;
    this.selectedBus = null;
  }

  cerrarEditar() {
    this.editBus = null;
  }

  abrirFormulario() {
    this.agregarBus = true;
  }

  cerrarAgregar() {
    this.agregarBus = false;
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
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los buses' });
      }
    );
  }

  confirmarEliminacion(bus: BusDTO) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que deseas eliminar el bus con placa ${bus.placa}?`,
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarBus(bus.id);
      }
    });
  }

  eliminarBus(id: string) {
    this.gestionarBusesService.eliminarBus(id).subscribe(() => {
      this.cargarBuses();
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Bus eliminado exitosamente' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el bus' });
    });
  }

  guardarNuevoBus(busNuevo: BusDTO) {
    this.gestionarBusesService.crearBus(busNuevo).subscribe(() => {
      this.cargarBuses();
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Nuevo bus agregado exitosamente' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el bus' });
    });
  }

  guardarCambiosBus(busActualizado: BusDTO) {
    this.gestionarBusesService.actualizarBus(busActualizado).subscribe(
      () => {
        this.cargarBuses();
        this.cerrarEditar();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Bus actualizado exitosamente' });
      },
      error => console.error('Error al guardar cambios:', error)
    );
  }

}
