package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class BusDTO implements Serializable {
    String placa;
    String modelo;
}