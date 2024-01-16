package com.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entities.Cours;

@Repository
public interface CoursRepository  extends JpaRepository<Cours,Long> {
}
