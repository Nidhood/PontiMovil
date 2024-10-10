import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {RModuloEstacionComponent} from '../r-modulo-estacion/r-modulo-estacion.component';
import {GestionarRutasService} from '../../share/gestionar-rutas.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {REstacionRecibidaDto} from '../../dto/gestionar-rutas/ruta-recibida/r-estacion-recibida-dto';
import {CdkDropList} from '@angular/cdk/drag-drop';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {CalendarModule} from 'primeng/calendar';
import {ChipsModule} from 'primeng/chips';
import {PickListModule} from 'primeng/picklist';
import {RHorarioDto} from '../../dto/gestionar-rutas/ruta-recibida/r-horario-dto';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {SkeletonModule} from 'primeng/skeleton';
import { NgZone } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RRutaEnviadaDto} from '../../dto/gestionar-rutas/ruta-enviada/r-ruta-enviada-dto';
import {REstacionDto} from '../../dto/gestionar-rutas/estacion/r-estacion-dto';

interface DiaSemana {
  nombre: string;
  value: string;
}

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
    MultiSelectModule,
    ToastModule,
    SkeletonModule,
    AsyncPipe
  ],
  templateUrl: './r-editar-ruta.component.html',
  styleUrl: './r-editar-ruta.component.css',
  providers: [MessageService, ConfirmationService]
})

export class REditarRutaComponent {
  @Input() ruta: RRutaEnviadaDto = new RRutaEnviadaDto(
    '', // id
    '', // código
    new RHorarioDto('', '', ''), // horario
    [], // días de la semana
    [], // estaciones
  );
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<RRutaEnviadaDto>();

  estacionesAsignadas: REstacionRecibidaDto[] = [];
  estacionesNoAsignadas: REstacionRecibidaDto[] = [];

  diasOptions!: DiaSemana[];
  selectedDias!: DiaSemana[];

  horaInicioDate: Date = new Date();
  horaFinDate: Date = new Date();

  public loadingEstaciones$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  skeletonItems: any[] = Array(5).fill({});

  constructor(
    private gestionarRutasService: GestionarRutasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    if (this.ruta) {
      this.diasOptions = [
        { nombre: 'Lunes', value: 'Lunes' },
        { nombre: 'Martes', value: 'Martes' },
        { nombre: 'Miércoles', value: 'Miercoles' },
        { nombre: 'Jueves', value: 'Jueves' },
        { nombre: 'Viernes', value: 'Viernes' },
        { nombre: 'Sábado', value: 'Sabado' },
        { nombre: 'Domingo', value: 'Domingo' }
      ];
      this.cargarEstaciones();
      this.horaInicioDate = this.stringToDate(this.ruta.horario.horaInicio);
      this.horaFinDate = this.stringToDate(this.ruta.horario.horaFin);
      this.selectedDias = this.diasOptions.filter(option => this.ruta.diasSemana.includes(option.value));
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
    this.loadingEstaciones$.next(true);
    if (this.ruta && this.ruta.id) {
      this.gestionarRutasService.obtenerEstacionesPorRuta(this.ruta.id).subscribe(
        (estaciones: REstacionDto[]) => {
          this.estacionesAsignadas = estaciones.filter(e => e.dentroRuta);
          this.estacionesNoAsignadas = estaciones.filter(e => !e.dentroRuta);
          this.loadingEstaciones$.next(false);
          this.actualizarOrdenEstaciones();
          this.messageService.add({ severity: 'success', summary: 'Estaciones cargadas', detail: 'Las estaciones han sido cargadas.', life: 3000 });
        },
        error => {
          this.loadingEstaciones$.next(false);
          this.messageService.add({ severity: 'error', summary: 'Error al cargar estaciones', detail: error, life: 3000 });
        }
      );
    } else {
      this.loadingEstaciones$.next(false);
      this.messageService.add({ severity: 'error', summary: 'Error al cargar estaciones', detail: 'No se pudo cargar las estaciones.', life: 3000 });
    }
  }

  onMoveToTarget(event: any) {
    this.actualizarOrdenEstaciones();
  }

  onMoveToSource(event: any) {
    this.actualizarOrdenEstaciones();
  }

  actualizarOrdenEstaciones() {
    this.estacionesAsignadas.forEach((estacion, index) => {
      estacion.orden = (index + 1).toString();
      estacion.dentroRuta = true;
    });

    this.estacionesNoAsignadas.forEach(estacion => {
      estacion.orden = '';
      estacion.dentroRuta = false;
    });
  }

  actualizarHora() {
    this.ruta.horario.horaInicio = this.dateToString(this.horaInicioDate);
    this.ruta.horario.horaFin = this.dateToString(this.horaFinDate);
    this.ruta.diasSemana = this.selectedDias.map(dia => dia.value);
  }

  saveChanges(event: Event) {
    if (this.ruta) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Estás seguro de que quieres guardar los cambios?',
        header: 'Confirmación de guardado',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept : () => {
          this.actualizarHora();
          this.ruta.estaciones = this.estacionesAsignadas;
          this.gestionarRutasService.actualizarRuta(this.ruta).subscribe(
            (rutaActualizada: RRutaEnviadaDto) => {
              this.save.emit(rutaActualizada);
            },
            error => this.messageService.add({severity: 'error', summary: 'Error al guardar los cambios', detail: error, life: 3000})
          );
          this.messageService.add({ severity: 'success', summary: 'Guardado exitoso', detail: 'Los cambios han sido guardados.', life: 3000 });
        },
        reject: () => {
          this.messageService.add({severity: 'error', summary: 'Guardado cancelado', detail: 'No se guardaron los cambios.',  life: 3000});
        }
      })
    }
  }

  deleteRoute(event: Event) {
    if (this.ruta && this.ruta.id) {

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Estás seguro de que quieres eliminar esta ruta?',
        header: 'Confirmación de eliminación',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept: () => {
          this.gestionarRutasService.eliminarRuta(this.ruta.id).subscribe(
            () => {
              this.close.emit();
            },
            error => this.messageService.add({severity: 'error', summary: 'Error al eliminar la ruta', detail: error, life: 3000})
          );
          this.messageService.add({ severity: 'info', summary: 'Eliminación exitosa', detail: 'La ruta ha sido eliminada.', life: 3000 });
        },
        reject: () => {
          this.messageService.add({severity: 'error', summary: 'Eliminación cancelada', detail: 'No se eliminó la ruta.',  life: 3000});
        }
      })
    }
  }

  closeEdit() {
    this.close.emit();
  }
}
