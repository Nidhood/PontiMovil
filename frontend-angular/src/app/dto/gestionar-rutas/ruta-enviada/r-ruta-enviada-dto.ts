import {RHorarioDto} from '../ruta-recibida/r-horario-dto';
import {REstacionRecibidaDto} from '../ruta-recibida/r-estacion-recibida-dto';

export class RRutaEnviadaDto {
  constructor(
    public id: string,
    public codigo: string,
    public horario: RHorarioDto,
    public diasSemana: string[],
    public estaciones: REstacionRecibidaDto[]
  ) {}
}
