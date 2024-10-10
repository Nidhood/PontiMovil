import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { NgIf } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConductorDTO } from '../../dto/gestionar-conductores/conductor-dto';
import { GestionarConductoresService } from '../../share/gestionar-conductores.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    InputNumberModule,
    ToastModule
  ],
  templateUrl: './c-editar-conductor.component.html',
  styleUrls: ['./c-editar-conductor.component.css'],
  providers: [MessageService]
})
export class CEditarConductorComponent implements OnInit {
  @Input() conductor!: ConductorDTO ; 
  conductorId: string | null = null;

  tipoVia: { label: string; value: string }[] = [];
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private gestionarConductoresService: GestionarConductoresService, private messageService: MessageService) { }

  ngOnInit(): void {

    
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

    // Inicializa el formulario y lo llena con los datos del conductor
    this.gestionarConductoresService.getConductorAEditar().subscribe(conductor => {
      if (conductor) {
        this.conductor = conductor; // Asigna el conductor recibido

        // Construcción del formulario con los datos del conductor
        this.registroForm = this.fb.group({
          nombre: [this.conductor.nombre, Validators.required],
          apellido: [this.conductor.apellido, Validators.required],
          cedula: [this.conductor.cedula, Validators.required],
          telefono: [this.conductor.telefono, Validators.required],
          tipoVia: [this.conductor.direccion.tipoVia, Validators.required],
          numeroVia: [this.conductor.direccion.numeroVia, Validators.required],
          numero: [this.conductor.direccion.numero, Validators.required],
          barrio: [this.conductor.direccion.barrio, Validators.required],
          localidad: [this.conductor.direccion.localidad, Validators.required]
        });
      }
    });
  }

  // Método para manejar el submit del formulario
  onSubmit(): void {
    if (this.registroForm.valid) {
      const datosConductor = this.registroForm.value;
      console.log('Datos actualizados del conductor:', datosConductor);
      this.conductor.nombre = datosConductor.nombre;
      this.conductor.apellido = datosConductor.apellido;
      this.conductor.cedula = datosConductor.cedula;
      this.conductor.telefono = datosConductor.telefono;
      this.conductor.direccion.tipoVia = datosConductor.tipoVia;
      this.conductor.direccion.numeroVia = datosConductor.numeroVia;
      this.conductor.direccion.numero = datosConductor.numero;
      this.conductor.direccion.barrio = datosConductor.barrio;
      this.conductor.direccion.localidad = datosConductor.localidad;

      this.gestionarConductoresService.editarConductor(this.conductor).subscribe({
        next: (response: any) => {
          console.log('Conductor actualizado con éxito');
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Conductor actualizado correctamente' });
        },
        error: (error: any) => {
          console.error('Error al actualizar el conductor:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el conductor' });
        }
      });
    } else {
      console.log('Formulario inválido');
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Formulario inválido, por favor revise los campos' });
    }
   
  }
}
