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
@Table(name = "buses")
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @ColumnDefault("gen_random_uuid()")
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "placa", nullable = false, length = 20)
    private String placa;

    @Column(name = "modelo", nullable = false, length = 20)
    private String modelo;

    // Constructores:
    public Bus() {}

    public Bus(String placa, String modelo) {
        this.placa = placa;
        this.modelo = modelo;
    }

    // Métodos:
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bus bus = (Bus) o;
        return Objects.equals(getId(), bus.getId()) && Objects.equals(getPlaca(), bus.getPlaca()) && Objects.equals(getModelo(), bus.getModelo());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getPlaca(), getModelo());
    }

    @Override
    public String toString() {
        return "Bus{" +
                "id=" + id +
                ", placa='" + placa + '\'' +
                ", modelo='" + modelo + '\'' +
                '}';
    }
}
