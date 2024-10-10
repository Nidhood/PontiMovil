package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion;

import lombok.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rEstacionDTO implements Serializable {
    UUID id;
    String nombre;
    Integer orden;
    rDireccionDTO direccion;
    Boolean dentroRuta;
}