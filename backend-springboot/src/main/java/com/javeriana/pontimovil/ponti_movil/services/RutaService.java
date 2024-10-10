package com.javeriana.pontimovil.ponti_movil.services;


import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_enviada.rEstacionEnviadaDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_enviada.rRutaEnviadaDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida.rRutaRecibidaDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida.rBusDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida.rConductorDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida.rEstacionRecibidaDTO;
import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida.rHorarioDTO;
import com.javeriana.pontimovil.ponti_movil.entities.*;
import com.javeriana.pontimovil.ponti_movil.exceptions.RutaNotFoundException;
import com.javeriana.pontimovil.ponti_movil.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RutaService {

    // Repositorio:
    RutaRepository rutaRepository;
    HorarioRepository horarioRepository;
    RutaEstacionRepository rutaEstacionRepository;
    AsignacionRepository asignacionRepository;
    EstacionRepository estacionRepository;

    // Constructor:
    @Autowired
    public RutaService(RutaRepository rutaRepository, HorarioRepository horarioRepository, RutaEstacionRepository rutaEstacionRepository, AsignacionRepository asignacionRepository, EstacionRepository estacionRepository) {
        this.rutaRepository = rutaRepository;
        this.horarioRepository = horarioRepository;
        this.rutaEstacionRepository = rutaEstacionRepository;
        this.asignacionRepository = asignacionRepository;
        this.estacionRepository = estacionRepository;
    }

    // Métodos:
    public List<Ruta> obtenerRutas() {
        return rutaRepository.findAll();
    }

    public List<RutaEstacion> obtenerEstacionesPorRuta(UUID id) {
        return rutaEstacionRepository.findByRuta(rutaRepository.findById(id).orElseThrow(()-> new RutaNotFoundException(id)));
    }

    public List<rRutaRecibidaDTO> obtenerRutasDetalladas(){
        List<rRutaRecibidaDTO> rutas = new ArrayList<>();

        // Obtenemos todas las rutas:
        List<Ruta> rutasList = rutaRepository.findAll();

        // Para cada ruta creamos un DTO:
        for(Ruta ruta : rutasList) {

            // Obtenemos el  horario asociado a la ruta con el nuevo formato DTO:
            rHorarioDTO horario = maptToHorarioDTO(ruta.getHorario());

            // Obtenemos los días de la semana asociados a la ruta:
            List<String> diasSemana = mapToDiasSemana(asignacionRepository.findByRutaId(ruta.getId()));

            // Obtenemos las estaciones asociadas a la ruta:
            List<rEstacionRecibidaDTO> estaciones = mapToEstacionDTO(rutaEstacionRepository.findByRuta(ruta).stream().map(RutaEstacion::getEstacion).toList());

            // Obtenemos los buses asociados a la ruta (Valores únicos):
            List<rBusDTO> buses = mapToBusDTO(asignacionRepository.findByRutaId(ruta.getId()).stream().map(Asignacion::getBus).distinct().toList());

            // Obtenemos los conductores asociados a la ruta (Valores únicos):
            List<rConductorDTO> conductores = mapToConductorDTO(asignacionRepository.findByRutaId(ruta.getId()).stream().map(Asignacion::getConductor).distinct().toList());

            // Creamos el nuevo DTO:
            rRutaRecibidaDTO rutaDTO = new rRutaRecibidaDTO(
                    ruta.getId(),
                    ruta.getCodigo(),
                    horario,
                    diasSemana,
                    estaciones,
                    buses,
                    conductores
                    );

            // Agregamos el DTO a la lista de rutas:
            rutas.add(rutaDTO);
        }

        // Retornamos la lista de rutas:
        return rutas;
    }

    public rHorarioDTO maptToHorarioDTO(Horario horario) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return new rHorarioDTO(
                horario.getId(),
                horario.getHoraInicio(),
                horario.getHoraFin()
                );
    }

    public List<rEstacionRecibidaDTO> mapToEstacionDTO(List<Estacion> estaciones) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return estaciones.stream()
                .filter(Objects::nonNull) // Filtra los elementos nulos
                .map(estacion -> new rEstacionRecibidaDTO(
                        estacion.getId(),
                        estacion.getNombre()
                )
        ).toList();
    }

    public List<rBusDTO> mapToBusDTO(List<Bus> buses) {
        // Mapeamos los buses en el nuevo formato DTO, omitiendo los nulos:
        return buses.stream()
                .filter(Objects::nonNull) // Filtra los elementos nulos
                .map(bus -> new rBusDTO(
                        bus.getPlaca(),
                        bus.getModelo()
                ))
                .toList();
    }

    public List<rConductorDTO> mapToConductorDTO(List<Conductor> conductores) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return conductores.stream()
                .filter(Objects::nonNull) // Filtra los elementos nulos
                .map(conductor -> new rConductorDTO(
                        conductor.getNombre(),
                        conductor.getApellido()
                )
        ).toList();
    }

    public List<String> mapToDiasSemana(List<Asignacion> asignaciones) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return asignaciones.stream()
                .filter(Objects::nonNull) // Filtra los elementos nulos
                .map(Asignacion::getDiaSemana).toList();
    }

    public Ruta obtenerRutaPorId(UUID id) {
        return rutaRepository.findById(id).orElseThrow(()-> new RutaNotFoundException(id));
    }

    public void crearRuta(rRutaEnviadaDTO ruta) {
        Ruta nuevaRuta = new Ruta();
        Horario horario = null;

        // Buscamos si el horario ya existe, si no lo creamos:
        if(horarioRepository.existsByHoraInicioAndHoraFin(ruta.getHorario().getHoraInicio(), ruta.getHorario().getHoraFin())) {
            horario = horarioRepository.findByHoraInicioAndHoraFin(ruta.getHorario().getHoraInicio(), ruta.getHorario().getHoraFin());
        } else {
            horario = new Horario();
            horario.setHoraInicio(ruta.getHorario().getHoraInicio());
            horario.setHoraFin(ruta.getHorario().getHoraFin());
            horarioRepository.save(horario);
        }

        // Creamos la nueva ruta:
        nuevaRuta.setCodigo(ruta.getCodigo());
        nuevaRuta.setHorario(horario);
        rutaRepository.save(nuevaRuta);

        // Asignamos las estaciones a la ruta:
        for (rEstacionEnviadaDTO estacion : ruta.getEstaciones()) {
            RutaEstacion rutaEstacion = new RutaEstacion();
            rutaEstacion.setRuta(nuevaRuta); // Asignamos la nueva ruta

            // Buscamos la estación existente por nombre:
            Estacion estacionExistente = estacionRepository.findByNombre(estacion.getNombre());
            rutaEstacion.setEstacion(estacionExistente); // Asignamos la estación encontrada

            // Inicializamos el identificador compuesto:
            RutaEstacionId rutaEstacionId = new RutaEstacionId();
            rutaEstacionId.setRutaId(nuevaRuta.getId()); // Usamos el ID de la nueva ruta
            rutaEstacionId.setEstacionId(estacionExistente.getId()); // Usamos el ID de la estación

            rutaEstacion.setId(rutaEstacionId);  // Establecemos el identificador compuesto
            rutaEstacion.setOrden(estacion.getOrden()); // Establecemos el orden de la estación

            // Guardamos la nueva estación asociada a la ruta
            rutaEstacionRepository.save(rutaEstacion);
        }

        // Asignamos los días de la semana a la ruta:
        for(String dia : ruta.getDiasSemana()) {
            Asignacion asignacion = new Asignacion();
            asignacion.setDiaSemana(dia);
            asignacion.setRuta(nuevaRuta);
            asignacionRepository.save(asignacion);
        }
    }

    @Transactional
    public void actualizarRuta(UUID id, rRutaEnviadaDTO ruta) {
        Ruta rutaExistente = rutaRepository.findById(id).orElseThrow(() -> new RutaNotFoundException(id));
        Horario horarioExistente = rutaExistente.getHorario();
        String[] diasSemana = {"Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"};

        // Actualizamos el horario existente
        horarioExistente.setHoraInicio(ruta.getHorario().getHoraInicio());
        horarioExistente.setHoraFin(ruta.getHorario().getHoraFin());
        horarioRepository.save(horarioExistente);

        // Actualizamos los campos de la ruta existente
        rutaExistente.setCodigo(ruta.getCodigo());
        rutaRepository.save(rutaExistente);

        // Actualizamos las estaciones asociadas a la ruta
        actualizarEstaciones(rutaExistente, ruta.getEstaciones());

        // Manejamos las asignaciones
        manejarAsignaciones(rutaExistente, ruta.getDiasSemana());
    }

    @Transactional
    public void actualizarEstaciones(Ruta rutaExistente, List<rEstacionEnviadaDTO> nuevasEstaciones) {
        List<RutaEstacion> estacionesExistentes = rutaEstacionRepository.findByRuta(rutaExistente);
        rutaEstacionRepository.deleteAll(estacionesExistentes);

        for (rEstacionEnviadaDTO estacion : nuevasEstaciones) {
            RutaEstacion rutaEstacion = new RutaEstacion();
            RutaEstacionId rutaEstacionId = new RutaEstacionId();
            rutaEstacionId.setRutaId(rutaExistente.getId());
            rutaEstacionId.setEstacionId(estacionRepository.findByNombre(estacion.getNombre()).getId());

            rutaEstacion.setId(rutaEstacionId);
            rutaEstacion.setRuta(rutaExistente);
            rutaEstacion.setEstacion(estacionRepository.findByNombre(estacion.getNombre()));
            rutaEstacion.setOrden(estacion.getOrden());

            rutaEstacionRepository.save(rutaEstacion);
        }
    }

    @Transactional
    public void manejarAsignaciones(Ruta rutaExistente, List<String> diasSemana) {
        List<String> todosDias = Arrays.asList("Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo");

        // Primero, manejamos los días que deben tener asignaciones
        for (String dia : diasSemana) {
            List<Asignacion> asignacionesExistentes = asignacionRepository.findByRutaIdAndDiaSemana(rutaExistente.getId(), dia);
            if (asignacionesExistentes.isEmpty()) {
                // Crear nueva asignación si no existe
                Asignacion nuevaAsignacion = new Asignacion();
                nuevaAsignacion.setRuta(rutaExistente);
                nuevaAsignacion.setDiaSemana(dia);
                asignacionRepository.save(nuevaAsignacion);
            }
            // No necesitamos actualizar las existentes porque ya están correctamente asignadas
        }

        // Luego, manejamos los días que no deben tener asignaciones
        List<String> diasAEliminar = new ArrayList<>(todosDias);
        diasAEliminar.removeAll(diasSemana);

        for (String dia : diasAEliminar) {
            List<Asignacion> asignacionesAEliminar = asignacionRepository.findByRutaIdAndDiaSemana(rutaExistente.getId(), dia);
            for (Asignacion asignacion : asignacionesAEliminar) {
                if (asignacion.getBus() != null || asignacion.getConductor() != null) {
                    // Desvincular ruta
                    asignacion.setRuta(null);
                    asignacionRepository.save(asignacion);
                } else {

                    // Eliminar asignación
                    asignacionRepository.delete(asignacion);
                }
            }
        }
    }

    @Transactional
    public void eliminarRuta(UUID id) {
        Ruta ruta = rutaRepository.findById(id).orElseThrow(()-> new RutaNotFoundException(id));
        List<Asignacion> asignaciones = asignacionRepository.findByRutaId(ruta.getId());

        // Eliminamos todas las rutas que tengan asignaciones asociadas:
        for(Asignacion asignacion : asignaciones) {

            // Si no tiene asignaciones asociadas (solamente existe la ruta) eliminamos la asignación:
            if( asignacion.getConductor() == null || asignacion.getBus() == null) {
                asignacionRepository.delete(asignacion);
            }

            // Si tiene asignaciones asociadas (solo eliminamos la ruta dentro de cada asignación):
            else {
                asignacion.setRuta(null);
                asignacionRepository.save(asignacion);
            }
        }

        // Eliminamos todas las estaciones asociadas a la ruta:
        rutaEstacionRepository.deleteByRuta(ruta);

        // Eliminamos la ruta y todos sus horarios asociados:
        rutaRepository.deleteByCodigo(ruta.getCodigo());
    }
}
