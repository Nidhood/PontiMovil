package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rConductorDTO implements Serializable {
    String nombre;
    String apellido;
}