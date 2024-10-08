package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta;

import lombok.*;
import java.io.Serializable;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class HorarioDTO implements Serializable {
    LocalTime horaInicio;
    LocalTime horaFin;
}