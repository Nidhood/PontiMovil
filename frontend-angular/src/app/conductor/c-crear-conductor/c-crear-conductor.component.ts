import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { NgIf } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConductorDTO } from '../../dto/gestionar-conductores/conductor-dto';
import { CrearConductorDTO } from '../../dto/gestionar-conductores/crear-conductor-dto';
import { GestionarConductoresService } from '../../share/gestionar-conductores.service';
import { DireccionDTO } from '../../dto/gestionar-conductores/direccion-dto';

interface tipoVia {
  label: string;
  value: string;
}

@Component({
  selector: 'app-c-crear-conductor',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    InputNumberModule
  ],
  templateUrl: './c-crear-conductor.component.html',
  styleUrl: './c-crear-conductor.component.css'
})
export class CCrearConductorComponent implements OnInit {
  conductorForm!: FormGroup;

  constructor(private fb: FormBuilder, private gestionarConductoresService: GestionarConductoresService) {}

  ngOnInit() {
    this.conductorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoVia: ['', Validators.required],
      numeroVia: ['', Validators.required],
      numero: ['', Validators.required],
      barrio: ['', Validators.required],
      localidad: ['', Validators.required]
    });
  }

  crearConductor() {
    if (this.conductorForm.valid) {
      console.log('Formulario válido:', this.conductorForm.value);
      
      const direccion = new DireccionDTO(
        this.conductorForm.value.tipoVia,
        this.conductorForm.value.numeroVia,
        this.conductorForm.value.numero,
        this.conductorForm.value.localidad,
        this.conductorForm.value.barrio
      );

      const nuevoConductor = new CrearConductorDTO(
        this.conductorForm.value.nombre,
        this.conductorForm.value.apellido,
        this.conductorForm.value.cedula,
        this.conductorForm.value.telefono,
        direccion
      );

      console.log('Nuevo conductor:', nuevoConductor);

      this.gestionarConductoresService.crearConductor(nuevoConductor)
        .subscribe({
          next: (response) => {
            console.log('Conductor creado con éxito:', response);
            this.conductorForm.reset();
          },
          error: (error) => {
            console.error('Error al crear el conductor:', error);
          }
        });
    } else {
      console.log('Formulario inválido');
      // Opcionalmente, marcar todos los campos como tocados para mostrar errores
      Object.values(this.conductorForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}

