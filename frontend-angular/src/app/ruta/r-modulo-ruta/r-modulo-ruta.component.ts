import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RRutaRecibidaDto} from '../../dto/gestionar-rutas/ruta-recibida/r-ruta-recibida-dto';

@Component({
  selector: 'app-r-modulo-ruta',
  standalone: true,
  imports: [],
  templateUrl: './r-modulo-ruta.component.html',
  styleUrl: './r-modulo-ruta.component.css'
})
export class RModuloRutaComponent {
  @Input() ruta!: RRutaRecibidaDto;
  @Output() rutaSelected = new EventEmitter<RRutaRecibidaDto>();

  horaInicioDate: Date = new Date();
  horaFinDate: Date = new Date();

  ngOnInit() {
    if (this.ruta) {
      this.horaInicioDate = this.stringToDate(this.ruta.horario.horaInicio);
      this.horaFinDate = this.stringToDate(this.ruta.horario.horaFin);
    }
  }

  seleccionarRuta() {
    this.rutaSelected.emit(this.ruta);
  }

  formatDate(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0'); // Obtener las horas
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Obtener los minutos
    return `${hours}:${minutes}`; // Devolver en formato 'hh:mm'
  }


  stringToDate(timeString: string): Date {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date;
  }

}
