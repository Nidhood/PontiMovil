package com.javeriana.pontimovil.ponti_movil.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.Collection;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "rutas")
public class Ruta {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @ColumnDefault("gen_random_uuid()")
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "codigo", nullable = false, length = 20)
    private String codigo;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "horario_id", nullable = false)
    private Horario horario;

    // Constructores:
    public Ruta() {}

    // Métodos:
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ruta ruta = (Ruta) o;
        return Objects.equals(getId(), ruta.getId()) && Objects.equals(getCodigo(), ruta.getCodigo()) && Objects.equals(getHorario(), ruta.getHorario());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCodigo(), getHorario());
    }

    @Override
    public String toString() {
        return "Ruta{" +
                "id=" + id +
                ", codigo='" + codigo + '\'' +
                ", horario=" + horario +
                '}';
    }

}