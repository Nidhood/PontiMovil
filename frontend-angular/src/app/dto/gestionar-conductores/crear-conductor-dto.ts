import { DireccionDTO } from "./direccion-dto";

export class CrearConductorDTO {
    constructor(
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public telefono: string,
        public direccion: DireccionDTO
    ) {}
  }
  