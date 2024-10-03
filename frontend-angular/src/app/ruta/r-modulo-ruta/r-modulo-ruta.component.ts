import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RutaDto} from '../../dto/ruta/ruta-dto';

@Component({
  selector: 'app-r-modulo-ruta',
  standalone: true,
  imports: [],
  templateUrl: './r-modulo-ruta.component.html',
  styleUrl: './r-modulo-ruta.component.css'
})
export class RModuloRutaComponent {
  @Input() ruta!: RutaDto;
  @Output() rutaSelected = new EventEmitter<RutaDto>();

  seleccionarRuta() {
    this.rutaSelected.emit(this.ruta);
  }
}
