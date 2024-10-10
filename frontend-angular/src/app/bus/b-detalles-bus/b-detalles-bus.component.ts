import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';
import { ButtonModule } from 'primeng/button'; // Importamos PrimeNG para los botones

@Component({
  selector: 'app-b-detalles-bus',
  standalone: true,
  imports: [NgForOf, NgIf, ButtonModule],  // Añadimos NgIf para controles condicionales
  templateUrl: './b-detalles-bus.component.html',
  styleUrls: ['./b-detalles-bus.component.css']
})
export class BDetallesBusComponent {

  @Input() bus: BusDTO | undefined;  // Recibimos el bus como input
  @Output() close = new EventEmitter<void>();  // Evento para cerrar el modal
  @Output() edit = new EventEmitter<void>();  // Evento para editar el bus

  constructor() {}

  cerrarDetalle() {
    this.close.emit();  // Emite el evento para cerrar
  }

  editarBus() {
    this.edit.emit();  // Emite el evento para editar
  }
}
