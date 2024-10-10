import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { NgIf } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConductorDTO } from '../../dto/gestionar-conductores/conductor-dto';

@Component({
  selector: 'app-c-editar-conductor',
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
  templateUrl: './c-editar-conductor.component.html',
  styleUrls: ['./c-editar-conductor.component.css']
})
export class CEditarConductorComponent implements OnInit {
  @Input() conductor!: ConductorDTO; 
  tipoVia: { label: string; value: string }[] = [];
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Opciones del tipo de vía
    this.tipoVia = [
      { label: 'Calle', value: 'Calle' },
      { label: 'Carrera', value: 'Carrera' },
      { label: 'Avenida', value: 'Avenida' },
      { label: 'Diagonal', value: 'Diagonal' },
      { label: 'Transversal', value: 'Transversal' },
      { label: 'Circular', value: 'Circular' },
      { label: 'Manzana', value: 'Manzana' },
      { label: 'Kilómetro', value: 'Kilómetro' }
    ];

    // Simulación de datos quemados obtenidos de la base de datos
    const conductor = {
      nombre: 'Juan',
      apellido: 'Pérez',
      cedula: '123456789',
      telefono: '(300) 123-4567',
      tipoVia: 'Calle',
      numeroVia: 45,
      numero: 12,
      barrio: 'Los Cedros',
      localidad: 'Suba'
    };

    // Inicialización del formulario con los datos quemados
    this.registroForm = this.fb.group({
      nombre: [conductor.nombre, Validators.required],
      apellido: [conductor.apellido, Validators.required],
      cedula: [conductor.cedula, Validators.required],
      telefono: [conductor.telefono, Validators.required],
      tipoVia: [conductor.tipoVia, Validators.required],
      numeroVia: [conductor.numeroVia, Validators.required],
      numero: [conductor.numero, Validators.required],
      barrio: [conductor.barrio, Validators.required],
      localidad: [conductor.localidad, Validators.required]
    });
  }

  // Método para manejar el submit del formulario
  onSubmit(): void {
    if (this.registroForm.valid) {
      const datosConductor = this.registroForm.value;
      console.log('Datos actualizados del conductor:', datosConductor);
      // Aquí iría la lógica para enviar los datos al backend o servicio
    } else {
      console.log('Formulario inválido');
    }
  }
}
