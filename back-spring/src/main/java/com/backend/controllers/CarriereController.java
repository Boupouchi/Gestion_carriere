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

import com.backend.entities.Carriere;
import com.backend.services.CarriereService;
@RestController
@RequestMapping("/api/carrieres")
@CrossOrigin(origins = "*")
public class CarriereController {
    @Autowired
    CarriereService CarriereService;

    @PostMapping("/add")
    public ResponseEntity<Object> create(@RequestBody Carriere Carriere){
        CarriereService.create(Carriere);
        return ResponseEntity.ok(Map.of("message","Carriere created successfully"));
    }

    @GetMapping("/all")
    public List<Carriere> getAll(){
        return CarriereService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable long id){
        Carriere Carriere = CarriereService.findById(id);
        if(Carriere == null)
            return new ResponseEntity<>(Map.of("message","Carriere does not exist"), HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(Carriere);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> update(@PathVariable long id, @RequestBody Carriere Carriere){
        Carriere Carriere1 = CarriereService.findById(id);
        if (Carriere1 == null)
            return new ResponseEntity<>(Map.of("message","Carriere does not exist"), HttpStatus.NOT_FOUND);
        else{
            Carriere.setId(id);
            CarriereService.update(Carriere);
            return ResponseEntity.ok(Map.of("message","Carriere updated successfully"));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable long id){
        Carriere Carriere = CarriereService.findById(id);
        if (Carriere == null)
            return new ResponseEntity<>(Map.of("message","Carriere does not exist"), HttpStatus.NOT_FOUND);
        else{
            CarriereService.delete(Carriere);
            return ResponseEntity.ok(Map.of("message","Carriere deleted successfully"));
        }
    }
}
