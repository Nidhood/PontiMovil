import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {RutaDto} from '../dto/ruta/ruta-dto';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(private http: HttpClient) {}

  // Construimos el servicio para conseguir rutas:
  listaRutas(): Observable<RutaDto[]> {
    return this.http.get<RutaDto[]>(`${environment.SERVE_URL}/rutas/diasSemana`);
  }
}
