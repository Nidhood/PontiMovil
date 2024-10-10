import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConductorDTO } from '../../dto/gestionar-conductores/conductor-dto';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { GestionarConductoresService } from '../../share/gestionar-conductores.service';

@Component({
  selector: 'app-c-gestion-conductores',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './c-gestion-conductores.component.html',
  styleUrl: './c-gestion-conductores.component.css',
  providers: [ConfirmationService, MessageService]
})
export class CGestionConductoresComponent implements OnChanges {
  @Input() conductores: ConductorDTO[] = [];
  @Output() crearNuevoConductor = new EventEmitter<void>();
  @Output() editarUnConductor = new EventEmitter<ConductorDTO>();
  @Output() editarUnosBuses = new EventEmitter<ConductorDTO>();


  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private gestionarConductoresService: GestionarConductoresService) { }

  confirm1(event: Event, conductor: ConductorDTO) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro que quiere eliminar?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Ha aceptado eliminar' });
        this.gestionarConductoresService.eliminarConductor(conductor.id);

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  nuevoConductor() {
    this.crearNuevoConductor.emit();
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['conductores']) {
      console.log('Conductores recibidos:', this.conductores);
    }
  }

  editarBuses(conductor: ConductorDTO): void {
    // Implementa la lógica aquí
    this.editarUnosBuses.emit(conductor);
  }

  editarConductor(conductor: ConductorDTO): void {
    // Implementa la lógica aquí
    this.editarUnConductor.emit(conductor);

  }

  // eliminarConductor(conductor: ConductorDTO): void {
  //   // Implementa la lógica aquí  
  //   this.gestionarConductoresService.eliminarConductor(conductor.id);
  // }

}

