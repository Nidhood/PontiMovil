package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.javeriana.pontimovil.ponti_movil.entities.Estacion}
 */
@Value
public class EstacionDTO implements Serializable {
    String nombre;
}