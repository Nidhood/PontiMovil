import {Component, Input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {EstacionDTO} from '../../dto/gestionar-rutas/estacion/estacion-dto';

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
  @Input() estacion: EstacionDTO | null = null;
}

