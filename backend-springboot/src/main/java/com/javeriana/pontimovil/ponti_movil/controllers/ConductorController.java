package com.javeriana.pontimovil.ponti_movil.controllers;

import com.javeriana.pontimovil.ponti_movil.entities.Conductor;
import com.javeriana.pontimovil.ponti_movil.services.ConductorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/conductores")
public class ConductorController {

    // Service:
    private final ConductorService conductorService;

    // Constructor:
    @Autowired
    public ConductorController(ConductorService conductorService) {
        this.conductorService = conductorService;
    }

    // Métodos:
    @GetMapping
    public  List<Conductor> obtenerConductores() {
        return conductorService.obtenerConductores();
    }

    @GetMapping("/{id}")
    public Conductor obtenerConductorPorId(@PathVariable UUID id) {
        return conductorService.obtenerConductorPorId(id);
    }

    @PostMapping("/crear")
    public void crearConductor(@RequestBody Conductor conductor) {
        conductorService.crearConductor(conductor);
    }

    // @PostMapping("/{id}/actualizar")
    // public void actualizarConductor(@Valid Conductor conductor) {
    //     conductorService.actualizarConductor(conductor.getId(), conductor);        
    // }

    @PostMapping("/{id}/actualizar")
        public void actualizarConductor(@PathVariable UUID id, @RequestBody Conductor conductor) {
            conductorService.actualizarConductor(id, conductor);
    }

    @DeleteMapping("/{id}/eliminar")
    public void eliminarConductor(@PathVariable UUID id) {
        conductorService.eliminarConductor(id);
    }
}
