import {DireccionDTO} from './direccion-dto';

export class EstacionDTO {
  constructor(
    public id: number,
    public nombre: string,
    public direccion: DireccionDTO,
    public dentroRuta: boolean
  ) {}
}
