package com.backend.entities;

//import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
//import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Professor extends User {
    private String datadenaissance;

//    @ManyToMany(mappedBy = "professors")
//    @JsonIgnore
//private List<Carriere> carrieres ;
}
