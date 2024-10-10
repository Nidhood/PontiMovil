package com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus;

import lombok.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class BRutaDTO implements Serializable {
    private String id;
    private String codigo;
    private BHorarioDTO horario;
    private List<String> diasSemana; // Días de la semana en los que opera la ruta
    private List<BEstacionDTO> estaciones; // Lista de estaciones de la ruta
}
