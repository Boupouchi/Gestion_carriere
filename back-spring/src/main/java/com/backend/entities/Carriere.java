package com.backend.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Carriere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
  private   String nomCarriere;
    private   String   description   ;


    @OneToMany(mappedBy = "carriere")
    private List<Student> student;

    @ManyToMany
    private List<Filiere> filieres;


}

