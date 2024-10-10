package com.javeriana.pontimovil.ponti_movil.controllers;


import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion.rEstacionDTO;
import com.javeriana.pontimovil.ponti_movil.services.EstacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/estaciones")
public class EstacionController {

    // Servicios:
    private final EstacionService estacionService;

    // Constructor:
    @Autowired
    public EstacionController(EstacionService estacionService) {
        this.estacionService = estacionService;
    }

    // Métodos:
    @GetMapping
    public List<rEstacionDTO> obtenerEstaciones() {
        return estacionService.obtenerEstaciones();
    }

    @GetMapping("/{idRuta}")
    public List<rEstacionDTO> obtenerEstacionesPorRuta(@PathVariable UUID idRuta) {
        return estacionService.obtenerEstacionesPorRuta(idRuta);
    }
}
