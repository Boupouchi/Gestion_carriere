package com.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entities.Carriere;

@Repository
public interface CarriereRepository extends JpaRepository<Carriere,Long> {
}
