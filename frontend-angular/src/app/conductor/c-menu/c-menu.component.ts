import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, NgIf, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GestionarConductoresService } from '../../share/gestionar-conductores.service';
import { ConductorDTO } from '../../dto/gestionar-conductores/conductor-dto';
import { Observable } from 'rxjs';
import { CGestionConductoresComponent } from '../c-gestion-conductores/c-gestion-conductores.component';
import { CCrearConductorComponent } from '../c-crear-conductor/c-crear-conductor.component';
import { CEditarBusesComponent } from '../c-editar-buses/c-editar-buses.component';
import { CEditarConductorComponent } from '../c-editar-conductor/c-editar-conductor.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-menu',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    CEditarBusesComponent,
    CEditarConductorComponent,
    AsyncPipe,
    RouterLink,
    CGestionConductoresComponent,
    CCrearConductorComponent,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './c-menu.component.html',
  styleUrls: ['./c-menu.component.css']
})
export class CMenuComponent implements OnInit {
  @Input() conductorEditar!: ConductorDTO;
  conductores$: Observable<ConductorDTO[]> | undefined;
  conductor!: ConductorDTO;
  mostrarCrearConductor: boolean = false;
  mostrarEditarConductor: boolean = false;
  mostrarEditarBuses: boolean = false;
  slectedConductor!: ConductorDTO;
  idEditar!: string ;
  
  constructor(private gestionarConductoresService: GestionarConductoresService) {}

  ngOnInit(): void {
    this.conductores$ = this.gestionarConductoresService.obtenerConductores();
  }

  onCrearNuevoConductor(): void {
    this.mostrarCrearConductor = true;
  }

  onEditarBuses(conductor: ConductorDTO):void{
    this.mostrarEditarBuses = true;
  }

  onEditarConductor(conductor: any): void{

    if (!conductor) {
      console.error("Conductor is undefined or null");
      return;
    }
    this.conductorEditar = conductor;
    this.mostrarEditarConductor = true;
    console.log("mostrar editar = ",this.mostrarEditarConductor)
    console.log("mostrar selected conductor = ",this.slectedConductor)

  }

  volverAGestion(): void {
    this.mostrarCrearConductor = false;
    this.mostrarEditarConductor = false;
    this.mostrarEditarBuses = false;
  }
  asignarBuses(){

  }


}
