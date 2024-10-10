package com.javeriana.pontimovil.ponti_movil.exceptions;

import java.util.UUID;

public class RutaAlreadyAssignedException extends RuntimeException {

    public RutaAlreadyAssignedException(UUID idBus, UUID idRuta) {
        super("La ruta con ID " + idRuta + " ya está asignada al bus con ID " + idBus);
    }
}

