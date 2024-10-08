package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion;

import lombok.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class EstacionDTO implements Serializable {
    UUID id;
    String nombre;
    DireccionDTO direccion;
    Boolean dentroRuta;
}