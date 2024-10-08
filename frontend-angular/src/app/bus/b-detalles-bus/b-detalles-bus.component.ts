import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';

@Component({
  selector: 'app-b-detalles-bus',
  standalone: true,
  imports: [NgForOf],
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
