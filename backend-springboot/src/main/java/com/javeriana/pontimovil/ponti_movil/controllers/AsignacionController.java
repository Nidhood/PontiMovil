package com.javeriana.pontimovil.ponti_movil.controllers;

import com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus.BAsignacionDTO;
import com.javeriana.pontimovil.ponti_movil.services.AsignacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/asignaciones")
public class AsignacionController {

    // Servicios:
    private final AsignacionService asignacionService;

    // Constructor:
    @Autowired
    public AsignacionController(AsignacionService asignacionService) {
        this.asignacionService = asignacionService;
    }

    // Obtener todas las asignaciones
    @GetMapping
    public ResponseEntity<List<BAsignacionDTO>> obtenerAsignaciones() {
        List<BAsignacionDTO> asignaciones = asignacionService.obtenerAsignaciones();
        return ResponseEntity.ok(asignaciones);
    }

    // Obtener asignaciones por bus
    @GetMapping("/bus/{idBus}")
    public ResponseEntity<List<BAsignacionDTO>> obtenerAsignacionesPorBus(@PathVariable UUID idBus) {
        List<BAsignacionDTO> asignaciones = asignacionService.obtenerAsignacionesPorBus(idBus);
        return ResponseEntity.ok(asignaciones);
    }


    // Obtener asignaciones por conductor
    @GetMapping("/conductor/{idConductor}")
    public ResponseEntity<List<BAsignacionDTO>> obtenerAsignacionesPorConductor(@PathVariable UUID idConductor) {
        List<BAsignacionDTO> asignaciones = asignacionService.obtenerAsignacionesPorConductor(idConductor);
        return ResponseEntity.ok(asignaciones);
    }

    // Asignar un conductor a un bus
    @PostMapping("/{idConductor}/asignarBus/{idBus}")
    public ResponseEntity<Void> asignarBus(@PathVariable UUID idConductor, @PathVariable UUID idBus, @RequestParam String diaSemana) {
        asignacionService.asignarBus(idConductor, idBus, diaSemana);
        return ResponseEntity.ok().build();
    }

    // Desasignar un conductor de un bus
    @DeleteMapping("/{idConductor}/desasignarBus/{idBus}/{diaSemana}")
    public ResponseEntity<Void> desasignarBus(@PathVariable UUID idConductor, @PathVariable UUID idBus, @PathVariable String diaSemana) {
        asignacionService.desasignarBus(idConductor, idBus, diaSemana);
        return ResponseEntity.ok().build();
    }

    // Asignar una ruta a un bus
    @PostMapping("/{idBus}/asignarRuta/{idRuta}")
    public ResponseEntity<Void> asignarRuta(@PathVariable UUID idBus, @PathVariable UUID idRuta) {
        asignacionService.asignarRuta(idBus, idRuta);
        return ResponseEntity.ok().build();
    }

    // Desasignar una ruta de un bus
    @DeleteMapping("/{idBus}/desasignarRuta/{idRuta}")
    public ResponseEntity<Void> desasignarRuta(@PathVariable UUID idBus, @PathVariable UUID idRuta) {
        asignacionService.desasignarRuta(idBus, idRuta);
        return ResponseEntity.ok().build();
    }


}
