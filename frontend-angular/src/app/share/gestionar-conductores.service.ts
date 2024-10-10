import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import { ConductorDTO } from '../dto/gestionar-conductores/conductor-dto';
import { CrearConductorDTO } from '../dto/gestionar-conductores/crear-conductor-dto';

@Injectable({
  providedIn: 'root'
})
export class GestionarConductoresService {
  private conductorAEditar = new BehaviorSubject<ConductorDTO | null>(null);

  constructor(private http: HttpClient) {}

  // Construimos el servicio para conseguir los conductores:
  obtenerConductores(): Observable<ConductorDTO[]> {
    return this.http.get<ConductorDTO[]>(`${environment.SERVE_URL}/conductores`);
  }

  eliminarConductor(id: string): Observable<void> {
    console.log("Hola"+id);
    return this.http.delete<void>(`${environment.SERVE_URL}/conductores/${id}/eliminar`);
  }

  crearConductor(conductor: CrearConductorDTO):Observable<void> {
    return this.http.post<void>(`${environment.SERVE_URL}/conductores/crear`, conductor);
  }

  obtenerConductorPorId(id: string): Observable<ConductorDTO> {
    return this.http.get<ConductorDTO>(`${environment.SERVE_URL}/conductores/${id}`);
  }

  editarConductor(conductor: ConductorDTO):Observable<void>{
    return this.http.post<void>(`${environment.SERVE_URL}/conductores/${conductor.id}/actualizar`, conductor);
  }
  
  setConductorAEditar(conductor:ConductorDTO):void{
    this.conductorAEditar.next(conductor);
  }
  
  getConductorAEditar():Observable<ConductorDTO | null>{
    return this.conductorAEditar.asObservable(); // Devolver el Observable del BehaviorSubject
  }

}
