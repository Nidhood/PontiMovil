package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion;

import lombok.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rDireccionDTO implements Serializable {
    UUID id;
    String tipoVia;
    String numeroVia;
    String numero;
    String localidad;
    String barrio;
}