import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {RRutaRecibidaDto} from '../dto/gestionar-rutas/ruta-recibida/r-ruta-recibida-dto';
import {RRutaEnviadaDto} from '../dto/gestionar-rutas/ruta-enviada/r-ruta-enviada-dto';

@Injectable({
  providedIn: 'root'
})
export class GestionarRutasService {

  constructor(private http: HttpClient) {}

  // Construimos el servicio para conseguir rutas:
  listaRutas(): Observable<RRutaRecibidaDto[]> {
    return this.http.get<RRutaRecibidaDto[]>(`${environment.SERVE_URL}/rutas/detalladas`);
  }

  // Construimos el servicio para actualizar una ruta:
  actualizarRuta(ruta: RRutaEnviadaDto): Observable<RRutaEnviadaDto> {
    console.log('Datos de la ruta a actualizar:', ruta);
    return this.http.post<RRutaEnviadaDto>(`${environment.SERVE_URL}/rutas/${ruta.id}/actualizar`, ruta);
  }

  // Construimos el servicio para crear una ruta:
  crearRuta(ruta: RRutaEnviadaDto): Observable<RRutaEnviadaDto> {
    console.log('Datos de la ruta a crear:', ruta);
    return this.http.post<RRutaEnviadaDto>(`${environment.SERVE_URL}/rutas/crear`, ruta);
  }

  // Construimos el servicio para eliminar una ruta:
  eliminarRuta(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.SERVE_URL}/rutas/${id}/eliminar`);
  }

  // Construimos el servicio para conseguir las estaciones por ruta:
  obtenerEstacionesPorRuta(idRuta: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.SERVE_URL}/estaciones/${idRuta}`);
  }

  // Construimos el servicio para conseguir las estaciones:
  obtenerEstaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.SERVE_URL}/estaciones`);
  }
}
