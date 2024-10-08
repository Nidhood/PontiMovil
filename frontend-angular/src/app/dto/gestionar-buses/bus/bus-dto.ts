import { ConductorDTO } from './conductor-dto';
import { RutaDTO } from './ruta-dto';


export class BusDTO {
  constructor(
    public id: string,
    public placa: string,
    public modelo: string,
    public conductores: ConductorDTO[],
    public rutas: RutaDTO[]  // Asignar rutas al bus
  ) {}
}

