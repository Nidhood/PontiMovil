import {Component, Input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {REstacionDto} from '../../dto/gestionar-rutas/estacion/r-estacion-dto';

@Component({
  selector: 'app-r-modulo-estacion',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './r-modulo-estacion.component.html',
  styleUrl: './r-modulo-estacion.component.css'
})

export class RModuloEstacionComponent {
  @Input() estacion: REstacionDto | null = null;
}

