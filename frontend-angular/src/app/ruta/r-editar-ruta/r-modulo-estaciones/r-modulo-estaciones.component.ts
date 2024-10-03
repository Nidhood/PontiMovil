import {Component, Input} from '@angular/core';

interface Estacion {
  id?: number;
  nombre: string;
  direccion: string;
  codigo: string;
  tipo: string;
}

@Component({
  selector: 'app-r-modulo-estaciones',
  standalone: true,
  imports: [],
  templateUrl: './r-modulo-estaciones.component.html',
  styleUrl: './r-modulo-estaciones.component.css'
})

export class RModuloEstacionesComponent {

  @Input() estacion: Estacion = {
    nombre: '',
    direccion: '',
    codigo: '',
    tipo: ''
  };

  ngOnInit() {
    // Si necesitas cargar datos adicionales al inicializar el componente
  }

  verEnMapa() {
    // Implementar la lógica para ver la estación en el mapa
    console.log('Ver en mapa:', this.estacion.nombre);
  }
}
