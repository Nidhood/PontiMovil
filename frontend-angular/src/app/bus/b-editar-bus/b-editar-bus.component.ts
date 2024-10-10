import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { GestionarBusesService } from '../../share/gestionar-buses.service';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';
import { ConductorDTO } from '../../dto/gestionar-buses/bus/conductor-dto';
import { RutaDTO } from '../../dto/gestionar-buses/bus/ruta-dto';
import { AsignacionDTO } from '../../dto/gestionar-buses/bus/asignacion-dto';
import { PickListModule } from 'primeng/picklist';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-b-editar-bus',
  standalone: true,
  imports: [FormsModule, Button, PickListModule, NgIf],
  templateUrl: './b-editar-bus.component.html',
  styleUrls: ['./b-editar-bus.component.css']
})
export class BEditarBusComponent {
  @Input() bus: BusDTO = new BusDTO('', '', '', [], []); // Inicializamos el BusDTO
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<BusDTO>();

  rutasAsignadas: RutaDTO[] = [];
  rutasNoAsignadas: RutaDTO[] = [];
  conductoresAsignados: ConductorDTO[] = [];
  conductoresNoAsignados: ConductorDTO[] = [];
  isLoading = true;

  constructor(private gestionarBusesService: GestionarBusesService) {}

  ngOnInit() {
    if (this.bus) {
      this.cargarAsignaciones();
    }
  }

  cargarAsignaciones() {
    this.isLoading = true;

    this.gestionarBusesService.obtenerAsignacionesPorBus(this.bus.id).subscribe(
      (asignaciones: AsignacionDTO[]) => {
        const idsRutasAsignadas = asignaciones.map(asignacion => asignacion.ruta?.id);
        const idsConductoresAsignados = asignaciones.map(asignacion => asignacion.conductor.id);

        // Obtener rutas y filtrar asignadas/no asignadas
        this.gestionarBusesService.obtenerRutas().subscribe(
          (rutas: RutaDTO[]) => {
            this.rutasAsignadas = rutas.filter(ruta => idsRutasAsignadas.includes(ruta.id));
            this.rutasNoAsignadas = rutas.filter(ruta => !idsRutasAsignadas.includes(ruta.id));
          },
          error => console.error('Error al cargar rutas:', error)
        );

        // Obtener conductores y filtrar asignados/no asignados
        this.gestionarBusesService.obtenerTodosLosConductores().subscribe(
          (conductores: ConductorDTO[]) => {
            this.conductoresAsignados = conductores.filter(conductor => idsConductoresAsignados.includes(conductor.id));
            this.conductoresNoAsignados = conductores.filter(conductor => !idsConductoresAsignados.includes(conductor.id));
          },
          error => console.error('Error al cargar conductores:', error)
        );

        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar asignaciones:', error);
        this.isLoading = false;
      }
    );
  }

  onMoveToTarget(event: any) {
    event.items.forEach((item: any) => {
      if (item instanceof RutaDTO) {
        this.rutasAsignadas.push(item);
      } else if (item instanceof ConductorDTO) {
        this.conductoresAsignados.push(item);
      }
    });
  }

  onMoveToSource(event: any) {
    event.items.forEach((item: any) => {
      if (item instanceof RutaDTO) {
        this.rutasNoAsignadas.push(item);
      } else if (item instanceof ConductorDTO) {
        this.conductoresNoAsignados.push(item);
      }
    });
  }

  saveChanges() {
    this.bus.rutas = this.rutasAsignadas; // Actualizamos las rutas asignadas al bus

    this.gestionarBusesService.actualizarBus(this.bus).subscribe(
      (busActualizado: BusDTO) => {
        this.save.emit(busActualizado);  // Emitimos el bus actualizado
      },
      error => console.error('Error al actualizar el bus:', error)
    );
  }

  closeEdit() {
    this.close.emit();  // Emitimos el evento para cerrar el modal
  }
}
