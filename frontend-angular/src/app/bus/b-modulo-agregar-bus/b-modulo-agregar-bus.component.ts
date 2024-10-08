import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog'; // PrimeNG Dialog
import { InputTextModule } from 'primeng/inputtext'; // PrimeNG InputText
import { ButtonModule } from 'primeng/button'; // PrimeNG Button
import { FormsModule } from '@angular/forms'; // Angular Forms

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

  busData = {
    placa: '',
    modelo: ''
  };

  abrirFormulario() {
    this.displayModal = true; // Abre el modal cuando se hace clic en "Agregar Bus"
  }

  cerrarFormulario() {
    this.displayModal = false; // Cierra el modal
  }

  guardarBus() {
    console.log('Bus guardado:', this.busData);
    // Aquí enviarías los datos del bus al backend
    this.cerrarFormulario(); // Cierra el modal tras guardar el bus
  }
}
