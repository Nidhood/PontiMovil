package com.javeriana.pontimovil.ponti_movil.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Entity(name = "asignaciones")
public class Asignacion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @ColumnDefault("gen_random_uuid()")
    @Column(name = "id", nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "conductor_id", nullable = false)
    private Conductor conductor;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "bus_id", nullable = false)
    private Bus bus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ruta_id") // Puede ser nulo
    private Ruta ruta;

    @Column(name = "dia_semana", nullable = false)
    private String diaSemana;

    // Constructores:
    public Asignacion() {}

    public Asignacion(Conductor conductor, Bus bus, String diaSemana) {
        this.conductor = conductor;
        this.bus = bus;
        this.diaSemana = diaSemana;
    }

    public Asignacion(Bus bus, Ruta ruta) {
        this.bus = bus;
        this.ruta = ruta;
    }


    // Métodos:
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Asignacion that = (Asignacion) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getConductor(), that.getConductor()) && Objects.equals(getBus(), that.getBus()) && Objects.equals(getRuta(), that.getRuta());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getConductor(), getBus(), getRuta());
    }

    @Override
    public String toString() {
        return "Asignacion{" +
                "id='" + id + '\'' +
                ", conductor=" + conductor +
                ", bus=" + bus +
                ", ruta=" + ruta +
                '}';
    }
}


