import {RDireccionDTO} from '../estacion/r-direccion-dto';

export class REstacionRecibidaDto {
  constructor(
    public id: number,
    public nombre: string,
    public  orden: string,
    public direccion: RDireccionDTO,
    public dentroRuta: boolean
  ) {}
}
