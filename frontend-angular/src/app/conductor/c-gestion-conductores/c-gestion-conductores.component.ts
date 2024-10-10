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

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,private gestionarConductoresService: GestionarConductoresService ) {}

    confirm1(event: Event, conductor: ConductorDTO) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
                this.eliminarConductor(conductor)
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

  nuevoConductor() {
    this.crearNuevoConductor.emit();
  }

  // constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conductores']) {
      console.log('Conductores recibidos:', this.conductores);
    }
  }

  editarBuses(conductor: ConductorDTO): void {
    // Implementa la lógica aquí
    this.crearNuevoConductor.emit();
  }

  editarConductor(conductor: ConductorDTO): void {
    // Implementa la lógica aquí
    this.crearNuevoConductor.emit();

  }

  eliminarConductor(conductor: ConductorDTO): void {
    // Implementa la lógica aquí  
    console.log(`Eliminar conductor con id: ${conductor.id}`);
    this.gestionarConductoresService.eliminarConductor(conductor.id)
  }

  
}

