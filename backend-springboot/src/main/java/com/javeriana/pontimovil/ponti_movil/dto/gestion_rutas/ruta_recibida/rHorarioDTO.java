package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida;

import lombok.*;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rHorarioDTO implements Serializable {
    UUID id;
    LocalTime horaInicio;
    LocalTime horaFin;
}