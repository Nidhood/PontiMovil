import {HorarioDTO} from "./horario-dto";
import {EstacionDto} from "./estacion-dto";
import {BusDTO} from "./bus-dto";
import {ConductorDTO} from "./conductor-dto";

export class RutaDto {
  constructor(
    public id: string,
    public codigo: string,
    public horario: HorarioDTO,
    public diasSemana: string[],
    public estaciones: EstacionDto[],
    public buses: BusDTO[],
    public conductores: ConductorDTO[]
  ) {}
}
