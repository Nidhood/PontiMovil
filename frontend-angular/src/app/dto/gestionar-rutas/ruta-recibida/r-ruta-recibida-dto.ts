import {RHorarioDto} from "./r-horario-dto";
import {RBusDto} from "./r-bus-dto";
import {RConductorDto} from "./r-conductor-dto";
import {REstacionRecibidaDto} from './r-estacion-recibida-dto';

export class RRutaRecibidaDto {
  constructor(
    public id: string,
    public codigo: string,
    public horario: RHorarioDto,
    public diasSemana: string[],
    public estaciones: REstacionRecibidaDto[],
    public buses: RBusDto[],
    public conductores: RConductorDto[]
  ) {}
}
