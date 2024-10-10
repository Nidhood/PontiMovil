package com.javeriana.pontimovil.ponti_movil.services;


import com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus.BBusDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus.BConductorDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus.BRutaDTO;
import com.javeriana.pontimovil.ponti_movil.entities.Asignacion;
import com.javeriana.pontimovil.ponti_movil.entities.Bus;
import com.javeriana.pontimovil.ponti_movil.exceptions.BusNotFoundException;
import com.javeriana.pontimovil.ponti_movil.repositories.AsignacionRepository;
import com.javeriana.pontimovil.ponti_movil.repositories.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BusService {

    // Repositorio:
    private final BusRepository busRepository;
    private final AsignacionRepository asignacionRepository;

    // Constructor:
    @Autowired
    public BusService(BusRepository busRepository, AsignacionRepository asignacionRepository) {
        this.busRepository = busRepository;
        this.asignacionRepository = asignacionRepository;
    }

    // Método para obtener todos los buses:
    public List<BBusDTO> obtenerBuses() {
        return busRepository.findAll().stream().map(bus -> new BBusDTO(
                        bus.getId().toString(),
                        bus.getPlaca(),
                        bus.getModelo(),
                        null,
                        null))
                .collect(Collectors.toList());
    }

    public Bus obtenerBusPorId(UUID id) {
        return busRepository.findById(id).orElseThrow(()-> new BusNotFoundException(id));
    }

    public BBusDTO obtenerBusDTOPorId(UUID id) {
        Bus bus = busRepository.findById(id).orElseThrow(() -> new BusNotFoundException(id));
        return mapToBusDTO(bus);
    }

    public void crearBus(Bus bus) {
        busRepository.save(bus);
    }

    public void actualizarBus(UUID id, Bus bus) {
        Bus busActual = busRepository.findById(id).orElseThrow(()-> new BusNotFoundException(id));
        busActual.setPlaca(bus.getPlaca());
        busActual.setModelo(bus.getModelo());
        busRepository.save(busActual);
    }

    public void eliminarBus(UUID id) {
        busRepository.deleteById(id);
    }

    private BBusDTO mapToBusDTO(Bus bus) {

        // Obtener las asignaciones del bus
        List<Asignacion> asignaciones = asignacionRepository.findByBusId(bus.getId());

        // Obtener los conductores únicos asociados a las asignaciones del bus
        List<BConductorDTO> conductoresDTO = asignaciones.stream()
                .map(Asignacion::getConductor)  // Mapeamos a conductores
                .distinct()  // Aseguramos que no se repitan
                .map(conductor -> new BConductorDTO(
                        conductor.getId().toString(),
                        conductor.getNombre(),
                        conductor.getApellido()
                ))
                .collect(Collectors.toList());

        // Obtener las rutas únicas asociadas a las asignaciones del bus
        List<BRutaDTO> rutasDTO = asignaciones.stream()
                .map(Asignacion::getRuta)  // Mapeamos a rutas
                .distinct()  // Aseguramos que no se repitan
                .map(ruta -> new BRutaDTO(
                        ruta.getId().toString(),
                        ruta.getCodigo(),
                        null, null, null
                ))
                .collect(Collectors.toList());

        return new BBusDTO(
                bus.getId().toString(),
                bus.getPlaca(),
                bus.getModelo(),
                conductoresDTO,
                rutasDTO
        );
    }
}
