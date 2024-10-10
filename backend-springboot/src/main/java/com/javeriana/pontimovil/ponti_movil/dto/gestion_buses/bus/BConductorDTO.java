package com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class BConductorDTO implements Serializable {
    private String id;
    private String nombre;
    private String apellido;
}
