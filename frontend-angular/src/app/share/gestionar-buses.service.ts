import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { BusDTO } from '../dto/gestionar-buses/bus/bus-dto';
import { ConductorDTO } from '../dto/gestionar-buses/bus/conductor-dto';
import { AsignacionDTO } from '../dto/gestionar-buses/bus/asignacion-dto';
import { RutaDTO } from '../dto/gestionar-buses/bus/ruta-dto'; // Ajusta si ya tienes este DTO

@Injectable({
  providedIn: 'root'
})
export class GestionarBusesService {

  constructor(private http: HttpClient) {}

  // Obtener la lista de buses detallados
  listaBuses(): Observable<BusDTO[]> {
    return this.http.get<BusDTO[]>(`${environment.SERVE_URL}/buses`);
  }

  // Crear un nuevo bus
  crearBus(bus: BusDTO | null): Observable<BusDTO> {
    return this.http.post<BusDTO>(`${environment.SERVE_URL}/buses/crear`, bus);
  }

  // Actualizar un bus existente
  actualizarBus(bus: BusDTO | null): Observable<BusDTO> {
    return this.http.post<BusDTO>(`${environment.SERVE_URL}/buses/${bus?.id}/actualizar`, bus);
  }

  // Eliminar un bus por ID
  eliminarBus(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.SERVE_URL}/buses/${id}/eliminar`);
  }

  // Obtener las rutas asignadas a un bus
  obtenerRutasPorBus(idBus: string | undefined): Observable<RutaDTO[]> { // Asumiendo que tienes un RutaDTO
    return this.http.get<RutaDTO[]>(`${environment.SERVE_URL}/rutas/bus/${idBus}`);
  }

  // Obtener los conductores asignados a un bus
  obtenerConductoresPorBus(idBus: string | undefined): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVE_URL}/conductores/bus/${idBus}`);
  }

  // Obtener asignaciones por bus
  obtenerAsignacionesPorBus(busId: string): Observable<AsignacionDTO[]> {
    return this.http.get<AsignacionDTO[]>(`${environment.SERVE_URL}/asignaciones/bus/${busId}`);
  }

  // Obtener todos los conductores disponibles
  obtenerTodosLosConductores(): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVE_URL}/conductores`);
  }

  obtenerRutas() : Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVE_URL}/rutas/dto`);
  }
}
