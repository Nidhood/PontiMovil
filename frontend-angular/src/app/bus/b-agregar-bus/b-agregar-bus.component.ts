import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto';

@Component({
  selector: 'app-b-agregar-bus',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './b-agregar-bus.component.html',
  styleUrls: ['./b-agregar-bus.component.css']
})
export class BAgregarBusComponent {

  bus: BusDTO = new BusDTO('', '', '',[], []);  // Inicializamos un nuevo bus

  @Output() save = new EventEmitter<BusDTO>();  // Emite el bus creado
  @Output() cancel = new EventEmitter<void>();  // Emite un evento para cerrar o cancelar

  guardarBus() {
    if (this.bus.placa && this.bus.modelo) {
      this.save.emit(this.bus);  // Emitir el bus para guardarlo
      this.limpiarFormulario();  // Limpiar el formulario después de guardar
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  cancelar() {
    this.cancel.emit();  // Emitir un evento de cancelación
    this.limpiarFormulario();  // Limpiar el formulario al cancelar
  }

  limpiarFormulario() {
    this.bus = new BusDTO('', '', '', [], []);  // Reiniciar el bus
  }
}
