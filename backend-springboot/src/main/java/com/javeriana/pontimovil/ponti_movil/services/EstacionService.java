package com.javeriana.pontimovil.ponti_movil.services;


import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion.rDireccionDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.estacion.rEstacionDTO;
import com.javeriana.pontimovil.ponti_movil.entities.Estacion;
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
    public List<rEstacionDTO> obtenerEstaciones() {

        List<rEstacionDTO> estaciones = new ArrayList<>();

        // Obtenemos todas las estaciones:
        List<Estacion> estacionesList = estacionRepository.findAll();

        // Crear DTO para cada estación:
        for(Estacion estacion : estacionesList) {

            // Crear DTO:
            rEstacionDTO estacionDTO = new rEstacionDTO();
            estacionDTO.setId(estacion.getId());
            estacionDTO.setNombre(estacion.getNombre());

            // Crear direccionDTO:
            rDireccionDTO direccionDTO = new rDireccionDTO();
            direccionDTO.setTipoVia(estacion.getDireccion().getTipoVia());
            direccionDTO.setNumeroVia(estacion.getDireccion().getNumeroVia());
            direccionDTO.setNumero(estacion.getDireccion().getNumero());
            direccionDTO.setLocalidad(estacion.getDireccion().getLocalidad());
            direccionDTO.setBarrio(estacion.getDireccion().getBarrio());
            estacionDTO.setDireccion(direccionDTO);

            // Agregar a la lista:
            estaciones.add(estacionDTO);
        }

        // Retornar lista de estaciones:
        return estaciones;
    }


    public List<rEstacionDTO> obtenerEstacionesPorRuta(UUID idRuta) {
        List<rEstacionDTO> estaciones = new ArrayList<>();

        // Obtenemos todas las estaciones:
        List<Estacion> estacionesList = estacionRepository.findAll();

        // Crear DTO para cada estación:
        for(Estacion estacion : estacionesList) {

            // Crear DTO:
            rEstacionDTO estacionDTO = new rEstacionDTO();
            estacionDTO.setId(estacion.getId());
            estacionDTO.setNombre(estacion.getNombre());

            // Crear direccionDTO:
            rDireccionDTO direccionDTO = new rDireccionDTO();
            direccionDTO.setTipoVia(estacion.getDireccion().getTipoVia());
            direccionDTO.setNumeroVia(estacion.getDireccion().getNumeroVia());
            direccionDTO.setNumero(estacion.getDireccion().getNumero());
            direccionDTO.setLocalidad(estacion.getDireccion().getLocalidad());
            direccionDTO.setBarrio(estacion.getDireccion().getBarrio());
            estacionDTO.setDireccion(direccionDTO);

            // Verificar si la estación pertenece a la ruta:
            estacionDTO.setDentroRuta(rutaEstacionRepository.existsByRutaIdAndEstacionId(idRuta, estacion.getId()));

            // Colocar orden:
            estacionDTO.setOrden(rutaEstacionRepository.findOrdenByRutaIdAndEstacionId(idRuta, estacion.getId()));

            // Agregar a la lista:
            estaciones.add(estacionDTO);
        }

        // Retornar lista de estaciones:
        return estaciones;
    }
}
