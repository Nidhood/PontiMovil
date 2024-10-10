import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {PickListModule} from 'primeng/picklist';
import {PrimeTemplate} from 'primeng/api';
import {RModuloEstacionComponent} from '../r-modulo-estacion/r-modulo-estacion.component';
import {RHorarioDto} from '../../dto/gestionar-rutas/ruta-recibida/r-horario-dto';
import {REstacionRecibidaDto} from '../../dto/gestionar-rutas/ruta-recibida/r-estacion-recibida-dto';
import {GestionarRutasService} from '../../share/gestionar-rutas.service';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {SkeletonModule} from 'primeng/skeleton';
import {BehaviorSubject} from 'rxjs';
import {RRutaEnviadaDto} from '../../dto/gestionar-rutas/ruta-enviada/r-ruta-enviada-dto';

interface DiaSemana {
  nombre: string;
  value: string;
}

@Component({
  selector: 'app-r-agregar-ruta',
  standalone: true,
  imports: [
    Button,
    CalendarModule,
    InputTextModule,
    MultiSelectModule,
    NgIf,
    PaginatorModule,
    PickListModule,
    PrimeTemplate,
    RModuloEstacionComponent,
    ConfirmDialogModule,
    ToastModule,
    SkeletonModule,
    NgForOf,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: './r-agregar-ruta.component.html',
  styleUrl: './r-agregar-ruta.component.css',
  providers: [MessageService, ConfirmationService]
})

export class RAgregarRutaComponent {

  @Input() ruta: RRutaEnviadaDto = new RRutaEnviadaDto(
    '', // id
    '', // código
    new RHorarioDto('', '', ''), // horario
    [], // días de la semana
    [] // estaciones
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
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
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
    this.horaInicioDate = this.stringToDate("00:00");
    this.horaFinDate = this.stringToDate("00:00");
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
    this.gestionarRutasService.obtenerEstaciones().subscribe(
      (estaciones: REstacionRecibidaDto[]) => {
        this.estacionesAsignadas = estaciones.filter(e => e.dentroRuta);
        this.estacionesNoAsignadas = estaciones.filter(e => !e.dentroRuta);
        this.loadingEstaciones$.next(false);
        this.messageService.add({ severity: 'success', summary: 'Estaciones cargadas', detail: 'Las estaciones han sido cargadas.', life: 3000 });
      },
      error => {
        this.loadingEstaciones$.next(false);
        this.messageService.add({ severity: 'error', summary: 'Error al cargar estaciones', detail: error, life: 3000 });
      }
    );
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

  createRute(event: Event) {
    if (this.ruta) {

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Estás seguro de crear la ruta?',
        header: 'Confirmación de guardado',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept : () => {
          this.actualizarHora();
          this.ruta.estaciones = this.estacionesAsignadas;
          this.gestionarRutasService.crearRuta(this.ruta).subscribe(
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

  closeEdit() {
    this.close.emit();
  }
}
