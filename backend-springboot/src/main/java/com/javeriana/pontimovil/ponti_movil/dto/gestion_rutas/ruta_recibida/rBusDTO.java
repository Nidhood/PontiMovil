package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rBusDTO implements Serializable {
    String placa;
    String modelo;
}