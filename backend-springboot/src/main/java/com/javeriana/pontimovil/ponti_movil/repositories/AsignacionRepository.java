package com.javeriana.pontimovil.ponti_movil.repositories;

import com.javeriana.pontimovil.ponti_movil.entities.Asignacion;
import com.javeriana.pontimovil.ponti_movil.entities.Conductor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface AsignacionRepository extends JpaRepository<Asignacion, UUID> {
    List<Asignacion> findByBusIdAndRutaId(UUID idBus, UUID idRuta);
    List<Asignacion> findByRutaId(UUID id);
    List<Asignacion> findByConductorId(UUID idConductor);
    Asignacion findByConductorIdAndBusIdAndDiaSemana(UUID idConductor, UUID idBus, String diaSemana);
    List<Asignacion> findByConductor(Conductor conductor);
    @Query(value = "SELECT dia " +
            "FROM (VALUES ('Lunes'), ('Martes'), ('Miercoles'), ('Jueves'), ('Viernes'), ('Sabado'), ('Domingo')) AS dias(dia) " +
            "WHERE dia NOT IN (SELECT DIA_SEMANA FROM ASIGNACIONES WHERE BUS_ID = :idBus)", nativeQuery = true)
    List<String> findDiasSemanaDisponibleByBusId(@Param("idBus") UUID idBus);
    Asignacion findByBusIdAndDiaSemana(UUID idBus, String diaSemana);
    List<Asignacion> findByBusIdAndRutaIdAndDiaSemana(UUID idBus, UUID idRuta, String diaSemana);
    List<Asignacion> findByRutaIdAndDiaSemana(UUID id, String dia);
}
