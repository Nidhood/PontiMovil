import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';
import { RutaDTO } from '../../dto/gestionar-buses/bus/ruta-dto';
import { MessageService } from 'primeng/api';
import {GestionarBusesService} from '../../share/gestionar-buses.service';
import {FormsModule} from '@angular/forms';
import {PickListModule} from 'primeng/picklist';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-b-editar-bus',
  templateUrl: './b-editar-bus.component.html',
  standalone: true,
  imports: [
    FormsModule,
    PickListModule,
    NgIf
  ],
  styleUrls: ['./b-editar-bus.component.scss']
})
export class BEditarBusComponent implements OnInit {
  @Input() bus!: BusDTO;  // Recibe el bus que se va a editar
  @Output() close = new EventEmitter<void>(); // Evento para informar al componente padre que debe cerrar el modal
  rutasAsignadas: RutaDTO[] = [];
  rutasNoAsignadas: RutaDTO[] = [];
  isLoading: boolean = true;
  @Output() save = new EventEmitter<BusDTO>();

  constructor(
    private gestionarBusesService: GestionarBusesService,
    private messageService: MessageService // Para notificaciones opcionales
  ) {}

  ngOnInit(): void {
    this.cargarDatosBus();
  }

  cargarDatosBus(): void {
    // Carga las rutas y asignaciones al iniciar la edición
    this.gestionarBusesService.obtenerAsignacionesPorBus(this.bus.id)
      .subscribe((asignaciones) => {
        this.gestionarBusesService.obtenerRutas()
          .subscribe((todasLasRutas) => {
            // Filtrar rutas asignadas y no asignadas
            this.rutasAsignadas = asignaciones.map(a => a.ruta); // Asignadas
            this.rutasNoAsignadas = todasLasRutas.filter(ruta =>
              !this.rutasAsignadas.some(asignada => asignada.id === ruta.id)
            ); // No asignadas
            this.isLoading = false;
          });
      });
  }

  onMoveToTarget(event: any): void {
    const rutasAsignadas: RutaDTO[] = event.items;
    rutasAsignadas.forEach(ruta => {
      this.gestionarBusesService.asignarRutaABus(this.bus.id, ruta.id)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Asignación', detail: `Ruta ${ruta.codigo} asignada.` });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `No se pudo asignar la ruta ${ruta.codigo}.` });
          }
        });
    });
  }

  onMoveToSource(event: any): void {
    const rutasDesasignadas: RutaDTO[] = event.items;
    console.log('Rutas desasignadas:', rutasDesasignadas);

    rutasDesasignadas.forEach(ruta => {
      this.gestionarBusesService.desasignarRutaDeBus(this.bus.id, ruta.id)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Desasignación', detail: `Ruta ${ruta.codigo} desasignada.` });
            // Eliminar la ruta desasignada de rutasAsignadas
            this.rutasAsignadas = this.rutasAsignadas.filter(r => r.id !== ruta.id);
            // Agregar la ruta a rutasNoAsignadas
            this.rutasNoAsignadas.push(ruta);
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `No se pudo desasignar la ruta ${ruta.codigo}.` });
          }
        });
    });
  }


  saveChanges(): void {
    // Actualización del bus con la nueva información
    this.gestionarBusesService.actualizarBus(this.bus).subscribe({
      next: (busActualizado) => {
        this.messageService.add({ severity: 'success', summary: 'Actualización', detail: 'Bus actualizado con éxito.' });
        this.closeEdit(); // Cierra el modal después de guardar los cambios
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar el bus.' });
      }
    });
  }

  closeEdit(): void {
    this.close.emit(); // Emitir el evento para que el componente padre cierre el modal
  }
}
