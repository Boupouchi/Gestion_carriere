package com.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dao.IDao;
import com.backend.entities.Carriere;
import com.backend.repositories.CarriereRepository;

@Service
public class CarriereService implements IDao<Carriere> {
    @Autowired
    CarriereRepository carriereRepository;

    @Override
    public Carriere create(Carriere o) {
        return carriereRepository.save(o);
    }

    @Override
    public Carriere update(Carriere o) {
        return carriereRepository.save(o);
    }

    @Override
    public Carriere findById(long id) {
        return carriereRepository.findById(id).orElse(null);
    }

    @Override
    public List<Carriere> findAll() {
        return carriereRepository.findAll();
    }

    @Override
    public boolean delete(Carriere o) {
        try{
            carriereRepository.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    
}
