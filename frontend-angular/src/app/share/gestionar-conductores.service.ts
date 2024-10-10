import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import { ConductorDTO } from '../dto/gestionar-conductores/conductor-dto';

@Injectable({
  providedIn: 'root'
})
export class GestionarConductoresService {

  constructor(private http: HttpClient) {}

  // Construimos el servicio para conseguir los conductores:
  obtenerConductores(): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVE_URL}/conductores`);
  }

  eliminarConductor(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.SERVE_URL}/conductores/${id}/eliminar`);
  }
  
}
