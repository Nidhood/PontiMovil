import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-c-gestion-conductores',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './c-gestion-conductores.component.html',
  styleUrl: './c-gestion-conductores.component.css'
})
export class CGestionConductoresComponent {
  conductores = [
    // Aquí puedes tener la lista de conductores cargada desde un servicio
    { id: 1, nombre: 'Juan', apellido: 'Pérez', cedula: '12345678A', telefono: '123456789' },
  ];

  constructor(private router: Router) {}

  nuevoConductor(): void {
    this.router.navigate(['/conductores/crear']);
  }

  eliminarConductor(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este conductor?')) {
      // Lógica para eliminar el conductor con el id proporcionado
      console.log(`Eliminar conductor con id: ${id}`);
    }
  }
}
