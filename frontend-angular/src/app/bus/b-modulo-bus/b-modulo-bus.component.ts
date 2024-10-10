import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-b-modulo-bus',
  standalone: true,
  templateUrl: './b-modulo-bus.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./b-modulo-bus.component.css']
})
export class BModuloBusComponent {
  @Input() bus!: BusDTO; // Información del bus que se va a mostrar
  @Output() busSelected = new EventEmitter<BusDTO>();

  seleccionarBus() {
    this.busSelected.emit(this.bus); // Emitimos el evento cuando se selecciona el bus
  }
}
