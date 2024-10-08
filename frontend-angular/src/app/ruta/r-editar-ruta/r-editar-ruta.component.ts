import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {RModuloEstacionComponent} from '../r-modulo-estacion/r-modulo-estacion.component';
import {GestionarRutasService} from '../../share/gestionar-rutas.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RutaDto} from '../../dto/gestionar-rutas/ruta/ruta-dto';
import {EstacionDTO} from '../../dto/gestionar-rutas/estacion/estacion-dto';
import {CdkDropList} from '@angular/cdk/drag-drop';
import {NgForOf, NgIf} from '@angular/common';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {PickListModule} from 'primeng/picklist';
import {HorarioDTO} from '../../dto/gestionar-rutas/ruta/horario-dto';
import {MultiSelectModule} from 'primeng/multiselect';

@Component({
  selector: 'app-r-editar-ruta',
  standalone: true,
  imports: [
    FormsModule,
    Button,
    RModuloEstacionComponent,
    ConfirmDialogModule,
    CdkDropList,
    NgForOf,
    NgIf,
    CalendarModule,
    ChipsModule,
    PickListModule,
    MultiSelectModule
  ],
  templateUrl: './r-editar-ruta.component.html',
  styleUrl: './r-editar-ruta.component.css'
})

export class REditarRutaComponent {
  @Input() ruta: RutaDto = new RutaDto(
    '', // id
    '', // código
    new HorarioDTO('', ''), // horario
    [], // días de la semana
    [], // estaciones
    [], // buses
    [] // conductores
  );
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<RutaDto>();

  estacionesAsignadas: EstacionDTO[] = [];
  estacionesNoAsignadas: EstacionDTO[] = [];

  diasOptions!: any[];
  selectedDias!: string[];

  horaInicioDate: Date = new Date();
  horaFinDate: Date = new Date();

  constructor(private gestionarRutasService: GestionarRutasService) {}

  ngOnInit() {
    if (this.ruta) {
      this.cargarEstaciones();
      this.horaInicioDate = this.stringToDate(this.ruta.horario.horaInicio);
      this.horaFinDate = this.stringToDate(this.ruta.horario.horaFin);
      this.selectedDias = this.ruta.diasSemana;
      this.diasOptions = [
        { label: 'Lunes', value: 'Lunes' },
        { label: 'Martes', value: 'Martes' },
        { label: 'Miércoles', value: 'Miércoles' },
        { label: 'Jueves', value: 'Jueves' },
        { label: 'Viernes', value: 'Viernes' },
        { label: 'Sábado', value: 'Sábado' },
        { label: 'Domingo', value: 'Domingo' }
      ];
    }
  }

  stringToDate(timeString: string): Date {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date;
  }

  dateToString(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  cargarEstaciones() {
    if (this.ruta && this.ruta.id) {
      this.gestionarRutasService.obtenerEstacionesPorRuta(this.ruta.id).subscribe(
        (estaciones: EstacionDTO[]) => {
          this.estacionesAsignadas = estaciones.filter(e => e.dentroRuta);
          this.estacionesNoAsignadas = estaciones.filter(e => !e.dentroRuta);
        },
        error => console.error('Error al cargar estaciones:', error)
      );
    }
  }

  onMoveToTarget(event: any) {
    event.items.forEach((estacion: EstacionDTO) => {
      estacion.dentroRuta = true;
    });
  }

  onMoveToSource(event: any) {
    event.items.forEach((estacion: EstacionDTO) => {
      estacion.dentroRuta = false;
    });
  }

  actualizarHora() {
    this.ruta.horario.horaInicio = this.dateToString(this.horaInicioDate);
    this.ruta.horario.horaFin = this.dateToString(this.horaFinDate);
    this.ruta.diasSemana = this.selectedDias;
  }

  saveChanges() {
    if (this.ruta) {
      this.actualizarHora();
      this.ruta.estaciones = this.estacionesAsignadas;
      this.gestionarRutasService.actualizarRuta(this.ruta).subscribe(
        (rutaActualizada: RutaDto) => {
          this.save.emit(rutaActualizada);
        },
        error => console.error('Error al actualizar la ruta:', error)
      );
    }
  }

  canDelete(): boolean {
    return this.ruta ? (this.ruta.conductores.length === 0 && this.ruta.buses.length === 0) : false;
  }

  deleteRoute() {
    if (this.canDelete() && this.ruta && this.ruta.id) {
      this.gestionarRutasService.eliminarRuta(this.ruta.id).subscribe(
        () => {
          this.close.emit();
        },
        error => console.error('Error al eliminar la ruta:', error)
      );
    }
  }

  closeEdit() {
    this.close.emit();
  }
}
