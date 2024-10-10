import {RDireccionDTO} from '../estacion/r-direccion-dto';

export class REstacionEnviadaDto {
  constructor(
    public id: number,
    public nombre: string,
    public  orden: string,
    public direccion: RDireccionDTO,
    public dentroRuta: boolean
  ) {}
}
