import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {RModuloEstacionesComponent} from './r-modulo-estaciones/r-modulo-estaciones.component';

interface Estacion {
  id?: number;
  nombre: string;
  direccion: string;
  codigo: string;
  tipo: string;
}

interface Ruta {
  id?: number;
  nombre: string;
  estaciones: Estacion[];
}

class RouteService {
}

@Component({
  selector: 'app-r-editar-ruta',
  standalone: true,
  imports: [
    FormsModule,
    Button,
    RModuloEstacionesComponent
  ],
  templateUrl: './r-editar-ruta.component.html',
  styleUrl: './r-editar-ruta.component.css'
})
export class REditarRutaComponent {
  ruta: Ruta = { nombre: '', estaciones: [] };
  estacionesDisponibles: Estacion[] = [];
  todasLasEstaciones: Estacion[] = [];

  constructor() { }

  ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    /*
    if (id) {
      this.routeService.getRoute(id).subscribe(ruta => {
        this.ruta = ruta;
        this.cargarTodasLasEstaciones();
      });
    } else {
      this.cargarTodasLasEstaciones();
    }*/
  }

  cargarTodasLasEstaciones() {
    /*this.routeService.getAllStations().subscribe(estaciones => {
      this.todasLasEstaciones = estaciones;
      this.actualizarEstacionesDisponibles();
    });*/
  }

  actualizarEstacionesDisponibles() {
    /*
    this.estacionesDisponibles = this.todasLasEstaciones.filter(
      estacion => !this.ruta.estaciones.some(e => e.id === estacion.id)
    );
    */
  }

  guardarCambios() {
    /*
    this.routeService.updateRoute(this.ruta).subscribe(() => {
      this.router.navigate(['/rutas']);
    });
    */
  }

  cancelarEdicion() {
    // this.router.navigate(['/rutas']);
  }
}
