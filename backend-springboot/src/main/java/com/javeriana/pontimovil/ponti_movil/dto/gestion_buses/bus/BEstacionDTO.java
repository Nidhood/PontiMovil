package com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class BEstacionDTO implements Serializable {
    private int id;
    private String nombre;
}
