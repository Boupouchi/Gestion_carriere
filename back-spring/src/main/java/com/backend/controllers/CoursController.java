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

import com.backend.entities.Cours;
import com.backend.services.CoursService;

@RestController
@RequestMapping("/api/cours")
@CrossOrigin(origins = "*")
public class CoursController {
    @Autowired
    CoursService CoursService;

    @PostMapping("/add")
    public ResponseEntity<Object> create(@RequestBody Cours Cours){
        CoursService.create(Cours);
        return ResponseEntity.ok(Map.of("message","Cours created successfully"));
    }

    @GetMapping("/all")
    public List<Cours> getAll(){
        return CoursService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable long id){
        Cours Cours = CoursService.findById(id);
        if(Cours == null)
            return new ResponseEntity<>(Map.of("message","Cours does not exist"), HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(Cours);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> update(@PathVariable long id, @RequestBody Cours Cours){
        Cours Cours1 = CoursService.findById(id);
        if (Cours1 == null)
            return new ResponseEntity<>(Map.of("message","Cours does not exist"), HttpStatus.NOT_FOUND);
        else{
            Cours.setId(id);
            CoursService.update(Cours);
            return ResponseEntity.ok(Map.of("message","Cours updated successfully"));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id){
        Cours Cours = CoursService.findById(id);
        if (Cours == null)
            return new ResponseEntity<>(Map.of("message","Cours does not exist"), HttpStatus.NOT_FOUND);
        else{
            CoursService.delete(Cours);
            return ResponseEntity.ok(Map.of("message","Cours deleted successfully"));
        }
    }
}
