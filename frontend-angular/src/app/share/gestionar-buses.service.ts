import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {BusDTO} from '../dto/gestionar-buses/bus/bus-dto';
import {ConductorDTO} from '../dto/gestionar-buses/bus/conductor-dto';
import {AsignacionDTO} from '../dto/gestionar-buses/bus/asignacion-dto';
@Injectable({
  providedIn: 'root'
})
export class GestionarBusesService {

  constructor(private http: HttpClient) {}

  // Obtener la lista de buses
  listaBuses(): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${environment.SERVE_URL}/buses/detallados`);
  }

  // Servicio para crear un bus
  crearBus(bus: BusDTO | null): Observable<BusDTO> {
    return this.http.post<BusDTO>(`${environment.SERVE_URL}/buses/crear`, bus);
  }

  // Servicio para actualizar un bus
  actualizarBus(bus: BusDTO | null): Observable<BusDTO> {
    return this.http.post<BusDTO>(`${environment.SERVE_URL}/buses/${bus?.id}/actualizar`, bus);
  }

  // Servicio para eliminar un bus
  eliminarBus(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.SERVE_URL}/buses/${id}/eliminar`);
  }

  // Servicio para obtener las rutas asignadas a un bus
  obtenerRutasPorBus(idBus: string | undefined): Observable<any[]> {
    return this.http.get<any[]>(`${environment.SERVE_URL}/rutas/${idBus}`);
  }

  // Servicio para obtener los conductores asignados a un bus
  obtenerConductoresPorBus(idBus: string | undefined): Observable<any[]> {
    return this.http.get<any[]>(`${environment.SERVE_URL}/conductores/${idBus}`);
  }

  obtenerAsignacionesPorBus(busId: string): Observable<AsignacionDTO[]> {
    return this.http.get<AsignacionDTO[]>(`${environment.SERVE_URL}/asignaciones/bus/${busId}`);
  }

  obtenerTodosLosConductores(): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVE_URL}/conductores`);
  }

}
