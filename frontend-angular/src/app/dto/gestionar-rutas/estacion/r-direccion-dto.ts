export class RDireccionDTO {
  constructor(
    public id: number,
    public tipoVia: string,
    public numeroVia: string,
    public numero: string,
    public localidad: string,
    public barrio: string
  ) {}
}
