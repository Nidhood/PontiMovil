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

interface tipoVia{
  label:string;
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
  viaSeleccionada: string | undefined;
  calles !: tipoVia[];
  registroForm!: FormGroup;


  constructor(private fb: FormBuilder, private gestionarConductoresService: GestionarConductoresService) { }

  ngOnInit(): void {
    this.calles = [{ label: "Calle", value: "Calle" },
    { label: "Carrera", value: "Carrera" },
    { label: "Avenida", value: "Avenida" },
    { label: "Diagonal", value: "Diagonal" },
    { label: "Transversal", value: "Transversal" },
    { label: "Circular", value: "Circular" },
    { label: "Manzana", value: "Manzana" },
    { label: "Kilómetro", value: "Kilómetro" }];
    throw new Error('Method not implemented.');

    // Initialize the form
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoVia: [null, Validators.required]  // Add form control for dropdown
    });
  }
  onSubmit() {
    if (this.registroForm.valid) {
      // Crear objeto conductor con los datos del formulario
      const conductor: CrearConductorDTO = {
        nombre: this.registroForm.value.nombre,
        apellido: this.registroForm.value.apellido,
        cedula: this.registroForm.value.cedula,
        telefono: this.registroForm.value.telefono,
        direccion: {
          tipoVia: this.registroForm.value.tipoVia,
          numeroVia: this.registroForm.value.numeroVia,
          numero: this.registroForm.value.numero,
          barrio: this.registroForm.value.barrio,
          localidad: this.registroForm.value.localidad,
        }
      };
      this.gestionarConductoresService.crearConductor(conductor);
    }
    
  }
}
