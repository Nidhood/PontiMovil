package com.javeriana.pontimovil.ponti_movil.controllers;

import com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus.BBusDTO;
import com.javeriana.pontimovil.ponti_movil.entities.Bus;
import com.javeriana.pontimovil.ponti_movil.services.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/buses")
public class BusController {

    // Servicios:
    private final BusService busService;

    // Constructor:
    @Autowired
    public BusController(BusService busService) {
        this.busService = busService;
    }

    // Obtener lista de buses con detalles de conductores y rutas:
    @GetMapping
    public List<BBusDTO> obtenerBuses() {
        return busService.obtenerBuses();
    }

    // Obtener un bus por ID:
    @GetMapping("/{id}")
    public BBusDTO obtenerBusPorId(@PathVariable UUID id) {
        return busService.obtenerBusDTOPorId(id);
    }

    // Crear un nuevo bus:
    @PostMapping("/crear")
    public void crearBus(@RequestBody Bus bus) {
        busService.crearBus(bus);
    }

    // Actualizar un bus existente:
    @PostMapping("/{id}/actualizar")
    public void actualizarBus(@PathVariable UUID id, @RequestBody Bus bus) {
        busService.actualizarBus(id, bus);
    }

    // Eliminar un bus:
    @DeleteMapping("/{id}/eliminar")
    public void eliminarBus(@PathVariable UUID id) {
        busService.eliminarBus(id);
    }
}
