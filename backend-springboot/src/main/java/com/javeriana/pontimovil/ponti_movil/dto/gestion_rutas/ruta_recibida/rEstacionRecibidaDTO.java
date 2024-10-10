package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida;

import lombok.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rEstacionRecibidaDTO implements Serializable {
    UUID id;
    String nombre;
}