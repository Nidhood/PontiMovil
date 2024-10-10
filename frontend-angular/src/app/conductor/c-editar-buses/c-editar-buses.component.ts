import { Component, Input, input } from '@angular/core';
import { ConductorDTO } from '../../dto/gestionar-conductores/conductor-dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-c-editar-buses',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './c-editar-buses.component.html',
  styleUrl: './c-editar-buses.component.css'
})
export class CEditarBusesComponent {
  @Input() conductor!: ConductorDTO;
  
}
