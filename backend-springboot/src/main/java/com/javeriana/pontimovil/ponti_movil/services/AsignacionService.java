package com.javeriana.pontimovil.ponti_movil.services;

import com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus.*;
import com.javeriana.pontimovil.ponti_movil.entities.*;
import com.javeriana.pontimovil.ponti_movil.exceptions.*;
import com.javeriana.pontimovil.ponti_movil.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AsignacionService {

    // Repositorios:
    private final ConductorRepository conductorRepository;
    private final BusRepository busRepository;
    private final RutaRepository rutaRepository;
    private final AsignacionRepository asignacionRepository;
    private final EstacionRepository estacionRepository;
    private final RutaEstacionRepository rutaEstacionRepository;

    // Constructor:
    public AsignacionService(ConductorRepository conductorRepository, BusRepository busRepository, RutaRepository rutaRepository, AsignacionRepository asignacionRepository, EstacionRepository estacionRepository, RutaEstacionRepository rutaEstacionRepository) {
        this.conductorRepository = conductorRepository;
        this.busRepository = busRepository;
        this.rutaRepository = rutaRepository;
        this.asignacionRepository = asignacionRepository;
        this.estacionRepository = estacionRepository;
        this.rutaEstacionRepository = rutaEstacionRepository;
    }

    // Métodos para convertir entidades a DTOs
    private BAsignacionDTO mapToAsignacionDTO(Asignacion asignacion) {
        BBusDTO busDTO = new BBusDTO(asignacion.getBus().getId().toString(), asignacion.getBus().getPlaca(), asignacion.getBus().getModelo(), null, null);
        BConductorDTO conductorDTO = asignacion.getConductor() != null ? new BConductorDTO(asignacion.getConductor().getId().toString(), asignacion.getConductor().getNombre(), asignacion.getConductor().getApellido()) : null;
        BRutaDTO rutaDTO = asignacion.getRuta() != null ? new BRutaDTO(asignacion.getRuta().getId().toString(), asignacion.getRuta().getCodigo(), null, null, null) : null;

        return new BAsignacionDTO(asignacion.getId().toString(), conductorDTO, busDTO, rutaDTO);
    }

    // Obtener todas las asignaciones
    public List<BAsignacionDTO> obtenerAsignaciones() {
        return asignacionRepository.findAll()
                .stream()
                .map(this::mapToAsignacionDTO)
                .collect(Collectors.toList());
    }

    // Asignar un conductor a un bus
    public void asignarBus(UUID idConductor, UUID idBus, String diaSemana) {
        Conductor conductor = conductorRepository.findById(idConductor).orElseThrow(() -> new ConductorNotFoundException(idConductor));
        Bus bus = busRepository.findById(idBus).orElseThrow(() -> new BusNotFoundException(idBus));

        Asignacion asignacion = new Asignacion(conductor, bus, diaSemana);
        asignacionRepository.save(asignacion);
    }

    // Desasignar un conductor de un bus
    public void desasignarBus(UUID idConductor, UUID idBus, String diaSemana) {
        Asignacion asignacion = asignacionRepository.findByConductorIdAndBusIdAndDiaSemana(idConductor, idBus, diaSemana);
        if (asignacion != null) {
            asignacionRepository.delete(asignacion);
        }
    }

    // Asignar una ruta a un bus
    public void asignarRuta(UUID idBus, UUID idRuta) {
        Bus bus = busRepository.findById(idBus).orElseThrow(() -> new BusNotFoundException(idBus));
        Ruta ruta = rutaRepository.findById(idRuta).orElseThrow(() -> new RutaNotFoundException(idRuta));

        // Revisa si ya existe una asignación de esa ruta para ese bus
        List<Asignacion> asignaciones = asignacionRepository.findByBusId(idBus);
        Asignacion asignacionExistente = asignaciones.stream()
                .filter(a -> a.getRuta() != null && a.getRuta().getId().equals(idRuta))
                .findFirst()
                .orElse(null);

        if (asignacionExistente == null) {
            // Crear una nueva asignación si no existe
            Asignacion nuevaAsignacion = new Asignacion(bus, ruta);
            asignacionRepository.save(nuevaAsignacion);
        } else {
            // Si ya está asignada, lanza una excepción o realiza alguna otra acción
            throw new RutaAlreadyAssignedException(idBus, idRuta);
        }
    }


    // Desasignar una ruta de un bus
    public void desasignarRuta(UUID idBus, UUID idRuta) {
        // Encontramos todas las asignaciones por bus y ruta
        List<Asignacion> asignaciones = asignacionRepository.findByBusIdAndRutaId(idBus, idRuta);

        // Eliminamos todas las asignaciones encontradas
        asignacionRepository.deleteAll(asignaciones);
    }

    // Obtener asignaciones por conductor
    public List<BAsignacionDTO> obtenerAsignacionesPorConductor(UUID idConductor) {
        return asignacionRepository.findByConductorId(idConductor)
                .stream()
                .map(this::mapToAsignacionDTO)
                .collect(Collectors.toList());
    }

    // Obtener días disponibles para asignación de un bus
    public List<String> obtenerDiasDisponibles(UUID idBus) {
        return asignacionRepository.findDiasSemanaDisponibleByBusId(idBus);
    }

    // Obtener asignaciones por bus
    public List<BAsignacionDTO> obtenerAsignacionesPorBus(UUID idBus) {
        return asignacionRepository.findByBusId(idBus)
                .stream()
                .map(this::mapToAsignacionDTO)
                .collect(Collectors.toList());
    }
}
