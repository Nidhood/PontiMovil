package com.javeriana.pontimovil.ponti_movil.repositories;

import com.javeriana.pontimovil.ponti_movil.entities.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.UUID;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, UUID> {
    boolean existsByHoraInicioAndHoraFin(LocalTime horaInicio, LocalTime horaFin);
    Horario findByHoraInicioAndHoraFin(LocalTime horaInicio, LocalTime horaFin);
}