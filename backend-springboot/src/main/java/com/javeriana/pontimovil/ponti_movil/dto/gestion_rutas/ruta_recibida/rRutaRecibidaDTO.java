package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida;

import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rRutaRecibidaDTO implements Serializable {
    UUID id;
    String codigo;
    rHorarioDTO horario;
    List<String> diasSemana;
    List<rEstacionRecibidaDTO> estaciones;
    List<rBusDTO> buses;
    List<rConductorDTO> conductores;
}