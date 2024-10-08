package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class DireccionDTO implements Serializable {
    String tipoVia;
    String numeroVia;
    String numero;
    String localidad;
    String barrio;
}