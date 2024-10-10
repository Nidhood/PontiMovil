import {ConductorDTO} from './conductor-dto';
import {BusDTO} from './bus-dto';
import {RutaDTO} from './ruta-dto';


export class AsignacionDTO {
  constructor(
    public id: string,
    public conductor: any,
    public bus: BusDTO,
    public ruta: RutaDTO
  ) {}
}
