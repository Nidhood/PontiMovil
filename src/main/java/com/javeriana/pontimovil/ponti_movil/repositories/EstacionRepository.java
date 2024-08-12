package com.javeriana.pontimovil.ponti_movil.repositories;

import com.javeriana.pontimovil.ponti_movil.entities.Estacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface EstacionRepository extends JpaRepository<Estacion, UUID> {
}