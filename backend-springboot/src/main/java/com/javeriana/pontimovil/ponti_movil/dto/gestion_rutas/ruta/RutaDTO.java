package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta;

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
public class RutaDTO implements Serializable {
    UUID id;
    String codigo;
    HorarioDTO horario;
    List<String> diasSemana;
    List<EstacionDTO> estaciones;
    List<BusDTO> buses;
    List<ConductorDTO> conductores;
}