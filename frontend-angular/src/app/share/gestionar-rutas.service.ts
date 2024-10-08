import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {RutaDto} from '../dto/gestionar-rutas/ruta/ruta-dto';

@Injectable({
  providedIn: 'root'
})
export class GestionarRutasService {

  constructor(private http: HttpClient) {}

  // Construimos el servicio para conseguir rutas:
  listaRutas(): Observable<RutaDto[]> {
    return this.http.get<RutaDto[]>(`${environment.SERVE_URL}/rutas/detalladas`);
  }

  // Construimos el servicio para actualizar una ruta:
  actualizarRuta(ruta: RutaDto | null): Observable<RutaDto> {
    return this.http.post<RutaDto>(`${environment.SERVE_URL}/rutas/${ruta?.id}/actualizar`, ruta);
  }

  // Construimos el servicio para eliminar una ruta:
  eliminarRuta(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.SERVE_URL}/rutas/${id}/eliminar`);
  }

  // Construimos el servicio para conseguir las estaciones por ruta:
  obtenerEstacionesPorRuta(idRuta: string | undefined): Observable<any[]> {
    return this.http.get<any[]>(`${environment.SERVE_URL}/estaciones/${idRuta}`);
  }

  // Construimos el servicio para crear una ruta:
  crearRuta(ruta: RutaDto | null): Observable<RutaDto> {
    return this.http.post<RutaDto>(`${environment.SERVE_URL}/rutas/crear`, ruta);
  }
}
