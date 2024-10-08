package com.javeriana.pontimovil.ponti_movil.services;


import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion.DireccionDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion.EstacionDTO;
import com.javeriana.pontimovil.ponti_movil.entities.Estacion;
import com.javeriana.pontimovil.ponti_movil.entities.RutaEstacion;
import com.javeriana.pontimovil.ponti_movil.repositories.EstacionRepository;
import com.javeriana.pontimovil.ponti_movil.repositories.RutaEstacionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class EstacionService {

    // Repositorio:
    EstacionRepository estacionRepository;
    RutaEstacionRepository rutaEstacionRepository;

    // Constructor:
    public EstacionService(EstacionRepository estacionRepository, RutaEstacionRepository rutaEstacionRepository) {
        this.estacionRepository = estacionRepository;
        this.rutaEstacionRepository = rutaEstacionRepository;
    }

    // Métodos:
    public List<EstacionDTO> obtenerEstacionesPorRuta(UUID idRuta) {

        List<EstacionDTO> estaciones = new ArrayList<>();

        // Obtenemos todas las estaciones:
        List<Estacion> estacionesList = estacionRepository.findAll();

        // Crear DTO para cada estación:
        for(Estacion estacion : estacionesList) {

            // Crear DTO:
            EstacionDTO estacionDTO = new EstacionDTO();
            estacionDTO.setId(estacion.getId());
            estacionDTO.setNombre(estacion.getNombre());

            // Crear direccionDTO:
            DireccionDTO direccionDTO = new DireccionDTO();
            direccionDTO.setTipoVia(estacion.getDireccion().getTipoVia());
            direccionDTO.setNumeroVia(estacion.getDireccion().getNumeroVia());
            direccionDTO.setNumero(estacion.getDireccion().getNumero());
            direccionDTO.setLocalidad(estacion.getDireccion().getLocalidad());
            direccionDTO.setBarrio(estacion.getDireccion().getBarrio());
            estacionDTO.setDireccion(direccionDTO);

            // Verificar si la estación pertenece a la ruta:
            estacionDTO.setDentroRuta(rutaEstacionRepository.existsByRutaIdAndEstacionId(idRuta, estacion.getId()));

            // Agregar a la lista:
            estaciones.add(estacionDTO);
        }

        // Retornar lista de estaciones:
        return estaciones;
    }
}
