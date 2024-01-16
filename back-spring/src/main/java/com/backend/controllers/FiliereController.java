package com.backend.controllers;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entities.Filiere;
import com.backend.services.FiliereService;

@RestController
@RequestMapping("/api/filieres")
@CrossOrigin(origins = "*")
public class FiliereController {
    @Autowired
    FiliereService FiliereService;

    @PostMapping("/add")
    public ResponseEntity<Object> create(@RequestBody Filiere Filiere){
        FiliereService.create(Filiere);
        return ResponseEntity.ok(Map.of("message","Filiere created successfully"));
    }

    @GetMapping("/all")
    public List<Filiere> getAll(){
        return FiliereService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable long id){
        Filiere Filiere = FiliereService.findById(id);
        if(Filiere == null)
            return new ResponseEntity<>(Map.of("message","Filiere does not exist"), HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(Filiere);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> update(@PathVariable long id, @RequestBody Filiere Filiere){
        Filiere Filiere1 = FiliereService.findById(id);
        if (Filiere1 == null)
            return new ResponseEntity<>(Map.of("message","Filiere does not exist"), HttpStatus.NOT_FOUND);
        else{
            Filiere.setId(id);
            FiliereService.update(Filiere);
            return ResponseEntity.ok(Map.of("message","Filiere updated successfully"));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id){
        Filiere Filiere = FiliereService.findById(id);
        if (Filiere == null)
            return new ResponseEntity<>(Map.of("message","Filiere does not exist"), HttpStatus.NOT_FOUND);
        else{
            FiliereService.delete(Filiere);
            return ResponseEntity.ok(Map.of("message","Filiere deleted successfully"));
        }
    }
}
