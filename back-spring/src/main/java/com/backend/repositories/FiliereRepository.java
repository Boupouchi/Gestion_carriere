package com.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entities.Filiere;

@Repository
public interface FiliereRepository  extends JpaRepository<Filiere,Long> {
}
