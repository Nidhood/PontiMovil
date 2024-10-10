import { Component, EventEmitter, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog'; // PrimeNG Dialog
import { InputTextModule } from 'primeng/inputtext'; // PrimeNG InputText
import { ButtonModule } from 'primeng/button'; // PrimeNG Button
import { FormsModule } from '@angular/forms'; // Angular Forms
import { BusDTO } from '../../dto/gestionar-buses/bus/bus-dto'; // BusDTO import
import { GestionarBusesService } from '../../share/gestionar-buses.service';
import {finalize} from 'rxjs'; // Importar servicio

@Component({
  selector: 'app-b-modulo-agregar-bus',
  standalone: true,
  imports: [
    DialogModule, // Importamos el DialogModule de PrimeNG
    InputTextModule, // Para los inputs
    ButtonModule, // Para los botones
    FormsModule // Para el binding con ngModel
  ],
  templateUrl: './b-modulo-agregar-bus.component.html',
  styleUrls: ['./b-modulo-agregar-bus.component.css']
})
export class BModuloAgregarBusComponent {
  displayModal: boolean = false; // Controla la visibilidad del modal

  busData: BusDTO = new BusDTO('', '', '', [], []); // Inicializa el objeto bus

  @Output() busGuardado = new EventEmitter<BusDTO>(); // Emite el bus guardado al componente principal

  constructor(private gestionarBusesService: GestionarBusesService) {}

  abrirFormulario() {
    this.displayModal = true; // Abre el modal cuando se hace clic en "Agregar Bus"
  }

  cerrarFormulario() {
    this.displayModal = false; // Cierra el modal
  }

  guardarBus() {
    if (this.busData.placa && this.busData.modelo) {
      this.gestionarBusesService.crearBus(this.busData).subscribe({
        next: (busGuardado: BusDTO) => {
          console.log('Bus guardado:', busGuardado);  // Añade este log para confirmar que se guarda el bus
          this.busGuardado.emit(busGuardado);  // Emitir el bus guardado al componente padre
          this.cerrarFormulario();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al guardar el bus:', error);
        }
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }


}
