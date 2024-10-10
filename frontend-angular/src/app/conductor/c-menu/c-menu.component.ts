import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GestionarConductoresService } from '../../share/gestionar-conductores.service';
import { ConductorDTO } from '../../dto/gestionar-conductores/conductor-dto';
import { Observable } from 'rxjs';
import { CGestionConductoresComponent } from '../c-gestion-conductores/c-gestion-conductores.component';
import { CCrearConductorComponent } from '../c-crear-conductor/c-crear-conductor.component';

@Component({
  selector: 'app-c-menu',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    AsyncPipe,
    RouterLink,
    CGestionConductoresComponent,
    CCrearConductorComponent
  ],
  templateUrl: './c-menu.component.html',
  styleUrls: ['./c-menu.component.css']
})
export class CMenuComponent implements OnInit {
  conductores$: Observable<ConductorDTO[]> | undefined;

  constructor(private gestionarConductoresService: GestionarConductoresService) {}

  ngOnInit(): void {
    this.conductores$ = this.gestionarConductoresService.obtenerConductores();
  }

  editarBuses(conductor: ConductorDTO): void{

  }

  editarConductor(conductor: ConductorDTO): void{

  }

  nuevoConductor(): void {
    //Implementar
  }

  eliminarConductor(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este conductor?')) {
      // Lógica para eliminar el conductor con el id proporcionado
      console.log(`Eliminar conductor con id: ${id}`);
    }
  }

}
