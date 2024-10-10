package com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_enviada;

import com.javeriana.pontimovil.ponti_movil.dto.gestion_rutas.ruta_recibida.rHorarioDTO;
import lombok.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class rRutaEnviadaDTO implements Serializable {
    UUID id;
    String codigo;
    rHorarioDTO horario;
    List<String> diasSemana;
    List<rEstacionEnviadaDTO> estaciones;

    @Override
    public String toString() {
        return "rRutaEnviadaDTO{" +
                "id=" + id +
                ", codigo='" + codigo + '\'' +
                ", horario=" + horario +
                ", diasSemana=" + diasSemana +
                ", estaciones=" + estaciones +
                '}';
    }
}