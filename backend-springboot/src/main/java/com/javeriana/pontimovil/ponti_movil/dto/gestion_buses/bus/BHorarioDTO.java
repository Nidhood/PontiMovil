package com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus;

import lombok.*;
import java.io.Serializable;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class BHorarioDTO implements Serializable {
    private String horaInicio;
    private String horaFin;

}