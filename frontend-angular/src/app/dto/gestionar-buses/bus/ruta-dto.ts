import {HorarioDTO} from "./horario-dto";
import {EstacionDTO} from "./estacion-dto";

export class RutaDTO {
  constructor(
    public id: string,
    public codigo: string,
    public horario: HorarioDTO,
    public diasSemana: string[],
    public estaciones: EstacionDTO[],
  ) {}
}
