import {RDireccionDTO} from './r-direccion-dto';

export class REstacionDto {
  constructor(
    public id: number,
    public nombre: string,
    public  orden: string,
    public direccion: RDireccionDTO,
    public dentroRuta: boolean
  ) {}
}
