package com.javeriana.pontimovil.ponti_movil.repositories;

import com.javeriana.pontimovil.ponti_movil.entities.Ruta;
import com.javeriana.pontimovil.ponti_movil.entities.RutaEstacion;
import com.javeriana.pontimovil.ponti_movil.entities.RutaEstacionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RutaEstacionRepository extends JpaRepository<RutaEstacion, RutaEstacionId> {
  void deleteByRuta(Ruta ruta);
  RutaEstacion findByRutaIdAndEstacionId(UUID idRuta, UUID idEstacion);
  List<RutaEstacion> findByRuta(Ruta ruta);
  Boolean existsByRutaIdAndEstacionId(UUID idRuta, UUID idEstacion);
}