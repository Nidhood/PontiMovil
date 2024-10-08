package com.javeriana.pontimovil.ponti_movil.services;

import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta.*;
import com.javeriana.pontimovil.ponti_movil.entities.*;
import com.javeriana.pontimovil.ponti_movil.exceptions.RutaNotFoundException;
import com.javeriana.pontimovil.ponti_movil.repositories.AsignacionRepository;
import com.javeriana.pontimovil.ponti_movil.repositories.HorarioRepository;
import com.javeriana.pontimovil.ponti_movil.repositories.RutaEstacionRepository;
import com.javeriana.pontimovil.ponti_movil.repositories.RutaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RutaService {

    private final AsignacionRepository asignacionRepository;
    // Repositorio:
    RutaRepository rutaRepository;
    HorarioRepository horarioRepository;
    RutaEstacionRepository rutaEstacionRepository;
    AsignacionRepository conductorBusRutaRepository;

    // Constructor:
    @Autowired
    public RutaService(RutaRepository rutaRepository, HorarioRepository horarioRepository, RutaEstacionRepository rutaEstacionRepository, AsignacionRepository conductorBusRutaRepository, AsignacionRepository asignacionRepository) {
        this.rutaRepository = rutaRepository;
        this.horarioRepository = horarioRepository;
        this.rutaEstacionRepository = rutaEstacionRepository;
        this.conductorBusRutaRepository = conductorBusRutaRepository;
        this.asignacionRepository = asignacionRepository;
    }

    // Métodos:
    public List<Ruta> obtenerRutas() {
        return rutaRepository.findAll();
    }

    public List<RutaEstacion> obtenerEstacionesPorRuta(UUID id) {
        return rutaEstacionRepository.findByRuta(rutaRepository.findById(id).orElseThrow(()-> new RutaNotFoundException(id)));
    }

    public List<RutaDTO> obtenerRutasDetalladas(){
        List<RutaDTO> rutas = new ArrayList<>();

        // Obtenemos todas las rutas:
        List<Ruta> rutasList = rutaRepository.findAll();

        // Para cada ruta creamos un DTO:
        for(Ruta ruta : rutasList) {

            // Obtenemos el  horario asociado a la ruta con el nuevo formato DTO:
            HorarioDTO horario = maptToHorarioDTO(ruta.getHorario());

            // Obtenemos los días de la semana asociados a la ruta:
            List<String> diasSemana = mapToDiasSemana(asignacionRepository.findByRutaId(ruta.getId()));

            // Obtenemos las estaciones asociadas a la ruta:
            List<EstacionDTO> estaciones = mapToEstacionDTO(rutaEstacionRepository.findByRuta(ruta).stream().map(RutaEstacion::getEstacion).toList());

            // Obtenemos los buses asociados a la ruta (Valores únicos):
            List<BusDTO> buses = mapToBusDTO(conductorBusRutaRepository.findByRutaId(ruta.getId()).stream().map(Asignacion::getBus).distinct().toList());

            // Obtenemos los conductores asociados a la ruta (Valores únicos):
            List<ConductorDTO> conductores = mapToConductorDTO(conductorBusRutaRepository.findByRutaId(ruta.getId()).stream().map(Asignacion::getConductor).distinct().toList());

            // Creamos el nuevo DTO:
            RutaDTO rutaDTO = new RutaDTO(
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

    public HorarioDTO maptToHorarioDTO(Horario horario) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return new HorarioDTO(
                horario.getHoraInicio(),
                horario.getHoraFin()
                );
    }

    public List<EstacionDTO> mapToEstacionDTO(List<Estacion> estaciones) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return estaciones.stream().map(estacion -> new EstacionDTO(
                estacion.getNombre()
                )
        ).toList();
    }

    public List<BusDTO> mapToBusDTO(List<Bus> buses) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return buses.stream().map(bus -> new BusDTO(
                bus.getPlaca(),
                bus.getModelo()
                )
        ).toList();
    }

    public List<ConductorDTO> mapToConductorDTO(List<Conductor> conductores) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return conductores.stream().map(conductor -> new ConductorDTO(
                conductor.getNombre(),
                conductor.getApellido()
                )
        ).toList();
    }

    public List<String> mapToDiasSemana(List<Asignacion> asignaciones) {

        // Mapeamos los conductores en el nuevo formato DTO:
        return asignaciones.stream().map(Asignacion::getDiaSemana).toList();
    }

    public Ruta obtenerRutaPorId(UUID id) {
        return rutaRepository.findById(id).orElseThrow(()-> new RutaNotFoundException(id));
    }

    public void crearRuta(Ruta ruta) {

        // Buscamos si el horario ya existe, si no lo creamos:
        if (ruta.getHorario().getId() == null) {
            Horario horario = new Horario(ruta.getHorario().getHoraInicio(), ruta.getHorario().getHoraFin());
            horarioRepository.save(horario);

            // Asignamos el horario a la ruta:
            ruta.setHorario(horario);
        }
        rutaRepository.save(ruta);
    }

    public void actualizarRuta(UUID id, RutaDTO ruta) {
        Ruta rutaExistente = rutaRepository.findById(id).orElseThrow(()-> new RutaNotFoundException(id));
        Horario horarioExistente = rutaExistente.getHorario();

        // Actualizamos el horario existente:
        horarioExistente.setHoraInicio(ruta.getHorario().getHoraInicio());
        horarioExistente.setHoraFin(ruta.getHorario().getHoraFin());
        horarioRepository.save(horarioExistente);

        // Actualizamos los campos de la ruta existente:
        rutaExistente.setCodigo(ruta.getCodigo());
        rutaRepository.save(rutaExistente);
    }

    public void eliminarRuta(UUID id) {
        Ruta ruta = rutaRepository.findById(id).orElseThrow(()-> new RutaNotFoundException(id));

        // Verificamos si la ruta tiene asignaciones (existen registros en la tabla conductor_bus_ruta):
        if (!conductorBusRutaRepository.findByRutaId(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "La ruta tiene asignaciones asociadas, no se puede eliminar");
        }

        // Eliminamos todas las estaciones asociadas a la ruta:
        rutaEstacionRepository.deleteByRuta(ruta);

        // Eliminamos la ruta y todos sus horarios asociados:
        rutaRepository.deleteByCodigo(ruta.getCodigo());
    }
}
