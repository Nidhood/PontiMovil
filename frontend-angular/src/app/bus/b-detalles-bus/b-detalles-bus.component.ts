import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';
import { RutaDTO } from '../../dto/gestionar-buses/bus/ruta-dto';
import { ButtonModule } from 'primeng/button';
import {AsignacionDTO} from '../../dto/gestionar-buses/bus/asignacion-dto';
import {GestionarBusesService} from '../../share/gestionar-buses.service'; // Importamos PrimeNG para los botones
import {AnimationOptions, LottieComponent} from 'ngx-lottie';

@Component({
  selector: 'app-b-detalles-bus',
  standalone: true,
  imports: [NgForOf, NgIf, ButtonModule, LottieComponent],  // Añadimos NgIf para controles condicionales
  templateUrl: './b-detalles-bus.component.html',
  styleUrls: ['./b-detalles-bus.component.css']
})
export class BDetallesBusComponent {

  @Input() bus: BusDTO | undefined;  // Recibimos el bus como input
  @Output() close = new EventEmitter<void>();  // Evento para cerrar el modal
  @Output() edit = new EventEmitter<void>();  // Evento para editar el bus

  asignaciones: AsignacionDTO[] = [];
  rutasAsignadas: RutaDTO[] = [];
  isLoading = true;

  loadingOptions: AnimationOptions = {
    path: '/assets/animations/loading.json',  // Ruta del archivo de la animación JSON
    loop: true,  // Hacer que la animación se repita mientras se está cargando
    autoplay: true  // Iniciar la animación automáticamente
  };

  constructor(private gestionarBusesService: GestionarBusesService) {}

  ngOnInit() {
    if (this.bus) {
      this.cargarAsignaciones();
    }
  }

  cargarAsignaciones() {
    this.isLoading = true; // Indicador de que estamos cargando datos

    this.gestionarBusesService.obtenerAsignacionesPorBus(this.bus?.id || 'Sin Bus').subscribe({
      next: (asignaciones: AsignacionDTO[]) => {
        this.asignaciones = asignaciones;

        // Filtramos solo las rutas asignadas
        this.rutasAsignadas = asignaciones
          .map(asignacion => asignacion.ruta)
          .filter((ruta, index, self) => ruta && self.findIndex(r => r?.id === ruta?.id) === index);

        this.isLoading = false; // Cuando los datos están cargados, ocultamos el indicador
      },
      error: (error) => {
        console.error('Error al cargar asignaciones:', error);
        this.isLoading = false; // Si ocurre un error, también ocultamos el indicador de carga
      }
    });
  }

  cerrarDetalle() {
    this.close.emit();  // Emite el evento para cerrar
  }

  editarBus() {
    this.edit.emit();  // Emite el evento para editar
  }
}
