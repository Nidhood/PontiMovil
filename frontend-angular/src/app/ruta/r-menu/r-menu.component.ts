import { Component } from '@angular/core';
import {BehaviorSubject, finalize, map, Observable} from 'rxjs';
import {RutaDto} from '../../dto/ruta/ruta-dto';
import {RutaService} from '../../share/ruta.service';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import {RModuloRutaComponent} from '../r-modulo-ruta/r-modulo-ruta.component';
import {RDetallesRutaComponent} from '../r-detalles-ruta/r-detalles-ruta.component';
import {RBuscarRutaComponent} from '../r-buscar-ruta/r-buscar-ruta.component';

@Component({
  selector: 'app-r-menu',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    AsyncPipe,
    NgForOf,
    LottieComponent,
    RModuloRutaComponent,
    RDetallesRutaComponent,
    RBuscarRutaComponent
  ],
  templateUrl: './r-menu.component.html',
  styleUrl: './r-menu.component.css'
})
export class RMenuComponent {
  private rutasSubject = new BehaviorSubject<RutaDto[]>([]);
  rutas$: Observable<RutaDto[]> = this.rutasSubject.asObservable();
  selectedRuta: RutaDto | null = null;
  guiaVisible = false;
  isLoading = true;

  constructor(private rutaService: RutaService) {}

  ngOnInit() {
    this.rutaService.listaRutas().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(rutas => {
      this.rutasSubject.next(rutas);
    });
  }

  onSearch(searchTerm: string) {
    this.rutas$ = this.rutasSubject.pipe(
      map(rutas => rutas.filter(ruta =>
        ruta.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ruta.estaciones.some(estacion =>
          estacion.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ))
    );
  }

  seleccionarRuta(ruta: RutaDto) {
    this.selectedRuta = ruta;
  }

  cerrarDetalles() {
    this.selectedRuta = null;
  }

  mostrarGuia() {
    this.guiaVisible = true;
  }

  cerrarGuia() {
    this.guiaVisible = false;
  }

  cerrarModal() {
    this.selectedRuta = null;
    this.guiaVisible = false;
  }

  options: AnimationOptions = {
    path: '/assets/animations/loading.json'
  };
}
