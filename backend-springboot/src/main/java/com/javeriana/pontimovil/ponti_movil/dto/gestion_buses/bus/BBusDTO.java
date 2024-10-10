package com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus;

import lombok.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class BBusDTO implements Serializable {
    private String id;
    private String placa;
    private String modelo;
    private List<BConductorDTO> conductores; // Lista de conductores asignados al bus
    private List<BRutaDTO> rutas; // Lista de rutas asignadas al bus
}
