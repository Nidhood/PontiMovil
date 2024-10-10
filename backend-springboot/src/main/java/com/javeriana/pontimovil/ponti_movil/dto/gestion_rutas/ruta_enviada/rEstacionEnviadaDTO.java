package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_enviada;

import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion.rDireccionDTO;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rEstacionEnviadaDTO implements Serializable {
    UUID id;
    String nombre;
    Integer orden;
    rDireccionDTO direccion;
}