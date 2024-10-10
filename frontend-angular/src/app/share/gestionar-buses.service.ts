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

  // Obtener asignaciones por bus
  obtenerAsignacionesPorBus(busId: string): Observable<AsignacionDTO[]> {
    return this.http.get<AsignacionDTO[]>(`${environment.SERVE_URL}/asignaciones/bus/${busId}`);
  }

  obtenerRutas() : Observable<RutaDTO[]> {
    return this.http.get<RutaDTO[]>(`${environment.SERVE_URL}/rutas/dto`);
  }

  // **Nueva funcionalidad: Asignar ruta a bus**
  asignarRutaABus(BusID: string, RutaID: string): Observable<void> {
    return this.http.post<void>(`${environment.SERVE_URL}/asignaciones/${BusID}/asignarRuta/${RutaID}`, {});
  }

  // **Nueva funcionalidad: Desasignar ruta de bus**
  desasignarRutaDeBus(BusID: string, RutaID: string): Observable<void> {
    return this.http.delete<void>(`${environment.SERVE_URL}/asignaciones/${BusID}/desasignarRuta/${RutaID}`);
  }


}
