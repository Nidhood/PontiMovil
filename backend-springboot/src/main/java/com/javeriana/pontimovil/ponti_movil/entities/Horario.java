package com.javeriana.pontimovil.ponti_movil.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "horarios")
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @ColumnDefault("gen_random_uuid()")
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    // Constructores:
    public Horario() {}

    public Horario(LocalTime horaInicio, LocalTime horaFin) {
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }

    // Métodos:
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Horario horario = (Horario) o;
        return Objects.equals(getId(), horario.getId()) && Objects.equals(getHoraInicio(), horario.getHoraInicio()) && Objects.equals(getHoraFin(), horario.getHoraFin());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getHoraInicio(), getHoraFin());
    }

    @Override
    public String toString() {
        return "Horario{" +
                "id=" + id +
                ", horaInicio=" + horaInicio +
                ", horaFin=" + horaFin +
                '}';
    }
}