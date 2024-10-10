package com.javeriana.pontimovil.ponti_movil.controllers;

import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_enviada.rRutaEnviadaDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida.rRutaRecibidaDTO;
import com.javeriana.pontimovil.ponti_movil.entities.Ruta;
import com.javeriana.pontimovil.ponti_movil.entities.RutaEstacion;
import com.javeriana.pontimovil.ponti_movil.services.RutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/rutas")
public class RutaController {

    // Service:
    private final RutaService rutaService;

    // Constructor:
    @Autowired
    public RutaController(RutaService rutaService) {
        this.rutaService = rutaService;
    }

    // Métodos:
    @GetMapping
    public List<Ruta> obtenerRutas() {
        return rutaService.obtenerRutas();
    }

    @GetMapping("/detalladas")
    public List<rRutaRecibidaDTO> obtenerRutasDetalladas(){return rutaService.obtenerRutasDetalladas();}

    @GetMapping("/{id}")
    public Ruta obtenerRutaPorId(@PathVariable UUID id) {
        return rutaService.obtenerRutaPorId(id);
    }

    @GetMapping("/{id}/estaciones")
    public List<RutaEstacion> obtenerEstacionesPorRuta(@PathVariable UUID id) {
        return rutaService.obtenerEstacionesPorRuta(id);
    }

    @PostMapping("/crear")
    public void crearRuta(@RequestBody rRutaEnviadaDTO ruta) {
        rutaService.crearRuta(ruta);
    }

    @PostMapping("/{id}/actualizar")
    public void actualizarRuta(@PathVariable UUID id, @RequestBody rRutaEnviadaDTO ruta) {
        rutaService.actualizarRuta(id, ruta);
    }

    @DeleteMapping("/{id}/eliminar")
    public void eliminarRuta(@PathVariable UUID id) {
        rutaService.eliminarRuta(id);
    }
}
