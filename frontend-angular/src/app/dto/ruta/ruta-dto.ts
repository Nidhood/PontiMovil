import {HorarioDTO} from "./horario-dto";
import {EstacionesDTO} from "./estaciones-dto";
import {BusDTO} from "./bus-dto";
import {ConductorDTO} from "./conductor-dto";

export class RutaDto {
  constructor(
    public codigo: string,
    public horario: HorarioDTO,
    public estaciones: EstacionesDTO[],
    public buses: BusDTO[],
    public conductores: ConductorDTO[]
  ) {}
}
