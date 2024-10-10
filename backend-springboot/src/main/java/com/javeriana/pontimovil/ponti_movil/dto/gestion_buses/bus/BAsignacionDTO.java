package com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus;

import lombok.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class BAsignacionDTO implements Serializable {
    private String id;
    private BConductorDTO conductor;
    private BBusDTO bus;
    private BRutaDTO ruta;
}
