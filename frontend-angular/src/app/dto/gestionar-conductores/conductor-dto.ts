import { DireccionDTO } from "../gestionar-conductores/direccion-dto";

export class ConductorDTO {
    constructor(
        public id: string,
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public telefono: string,
        public direccion: DireccionDTO
    ) {}
  }
  