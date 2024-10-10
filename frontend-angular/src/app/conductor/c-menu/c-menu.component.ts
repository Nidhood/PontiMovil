import { Component, OnInit } from '@angular/core';
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
  conductores$: Observable<ConductorDTO[]> | undefined;
  mostrarCrearConductor: boolean = false;
  mostrarEditarConductor: boolean = false;
  mostrarEditarBuses: boolean = false;
  slectedConductor: ConductorDTO | null = null;
  
  constructor(private gestionarConductoresService: GestionarConductoresService) {}

  ngOnInit(): void {
    this.conductores$ = this.gestionarConductoresService.obtenerConductores();
  }

  onCrearNuevoConductor(): void {
    this.mostrarCrearConductor = true;
  }

  volverAGestion(): void {
    this.mostrarCrearConductor = false;
  }

  clickEditarConductor(){
    // this.editarConductor = 
  }

  onEditarUnConductor(){
    this.mostrarEditarConductor = true;
  }

  editarConductor(){

  }

  onEditarUnosBuses(){
    this.mostrarEditarBuses = true;
  }

  asignarBuses(){

  }

  cerrarAsignarBuses(){
    this.mostrarEditarBuses = false;
  }

  cerrarEditarConductor(){
    this.mostrarEditarConductor = false;
  }



}
