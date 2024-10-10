package com.javeriana.pontimovil.ponti_movil.services;

import com.javeriana.pontimovil.ponti_movil.dto.gestion_buses.bus.BConductorDTO;
import com.javeriana.pontimovil.ponti_movil.entities.Asignacion;
import com.javeriana.pontimovil.ponti_movil.entities.Conductor;
import com.javeriana.pontimovil.ponti_movil.entities.Direccion;
import com.javeriana.pontimovil.ponti_movil.exceptions.ConductorNotFoundException;
import com.javeriana.pontimovil.ponti_movil.exceptions.DireccionNotFoundException;
import com.javeriana.pontimovil.ponti_movil.repositories.AsignacionRepository;
import com.javeriana.pontimovil.ponti_movil.repositories.ConductorRepository;
import com.javeriana.pontimovil.ponti_movil.repositories.DireccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ConductorService {

    private final ConductorRepository conductorRepository;
    private final DireccionRepository direccionRepository;
    private final AsignacionRepository asignacionRepository;

    // Constructor:
    @Autowired
    public ConductorService(ConductorRepository conductorRepository, DireccionRepository direccionRepository, AsignacionRepository asignacionRepository) {
        this.conductorRepository = conductorRepository;
        this.direccionRepository = direccionRepository;
        this.asignacionRepository = asignacionRepository;
    }

    // Obtener todos los conductores en formato BConductorDTO
    public List<BConductorDTO> obtenerConductores() {
        List<Conductor> conductores = conductorRepository.findAll();
        return conductores.stream()
                .map(this::convertirConductorADTO)
                .collect(Collectors.toList());
    }

    // Obtener un conductor por ID en formato BConductorDTO
    public BConductorDTO obtenerConductorPorId(UUID id) {
        Conductor conductor = conductorRepository.findById(id)
                .orElseThrow(() -> new ConductorNotFoundException(id));
        return convertirConductorADTO(conductor);
    }

    // Crear un nuevo conductor
    public void crearConductor(Conductor conductor) {
        if (direccionRepository.findByTipoViaAndNumeroViaAndNumero(
                conductor.getDireccion().getTipoVia(),
                conductor.getDireccion().getNumeroVia(),
                conductor.getDireccion().getNumero()) == null) {

            Direccion direccion = new Direccion(
                    conductor.getDireccion().getTipoVia(),
                    conductor.getDireccion().getNumeroVia(),
                    conductor.getDireccion().getNumero(),
                    conductor.getDireccion().getLocalidad(),
                    conductor.getDireccion().getBarrio());
            direccionRepository.save(direccion);
        }

        conductor.setDireccion(direccionRepository.findByTipoViaAndNumeroViaAndNumero(
                conductor.getDireccion().getTipoVia(),
                conductor.getDireccion().getNumeroVia(),
                conductor.getDireccion().getNumero()));
        conductorRepository.save(conductor);
    }

    // Actualizar un conductor
    public void actualizarConductor(UUID id, Conductor conductor) {
        Conductor conductorActual = conductorRepository.findById(id)
                .orElseThrow(() -> new ConductorNotFoundException(id));

        Direccion direccion = direccionRepository.findById(conductor.getDireccion().getId())
                .orElseThrow(() -> new ConductorNotFoundException(id));

        conductorActual.setNombre(conductor.getNombre());
        conductorActual.setApellido(conductor.getApellido());
        conductorActual.setCedula(conductor.getCedula());
        conductorActual.setTelefono(conductor.getTelefono());
        conductorActual.setDireccion(direccion);

        direccion.setTipoVia(conductor.getDireccion().getTipoVia());
        direccion.setNumeroVia(conductor.getDireccion().getNumeroVia());
        direccion.setNumero(conductor.getDireccion().getNumero());
        direccion.setLocalidad(conductor.getDireccion().getLocalidad());
        direccion.setBarrio(conductor.getDireccion().getBarrio());

        conductorRepository.save(conductorActual);
        direccionRepository.save(direccion);
    }

    public void eliminarConductor(UUID id) {
        Conductor conductor = conductorRepository.findById(id)
                .orElseThrow(() -> new ConductorNotFoundException(id));
        Direccion direccion = direccionRepository.findById(conductor.getDireccion().getId())
                .orElseThrow(() -> new ConductorNotFoundException(id));
        List<Asignacion> asignaciones = asignacionRepository.findByConductor(conductor);

        asignacionRepository.deleteAll(asignaciones);
        conductorRepository.delete(conductor);
        direccionRepository.delete(direccion);
    }

    // Convertir un Conductor a BConductorDTO
    private BConductorDTO convertirConductorADTO(Conductor conductor) {
        return new BConductorDTO(
                conductor.getId().toString(),
                conductor.getNombre(),
                conductor.getApellido()
        );
    }
}
