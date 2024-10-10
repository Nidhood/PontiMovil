//import { BusDTO } from "../gestionar-rutas/ruta/bus-dto"; 


export class ConductorDTO {
    constructor(
        public id: string,
        public nombre: string,
        public apellido: string,
        public cedula: string,
        public telefono: string,
        //public buses: BusDTO[],
        
    ) {}
  }
  