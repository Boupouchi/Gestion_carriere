package com.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dao.IDao;
import com.backend.entities.Filiere;
import com.backend.repositories.FiliereRepository;

@Service
public class FiliereService implements IDao<Filiere> {
    @Autowired
    FiliereRepository FiliereRepository;

    @Override
    public Filiere create(Filiere o) {
        return FiliereRepository.save(o);
    }

    @Override
    public Filiere update(Filiere o) {
        return FiliereRepository.save(o);
    }

    @Override
    public Filiere findById(long id) {
        return FiliereRepository.findById(id).orElse(null);
    }

    @Override
    public List<Filiere> findAll() {
        return FiliereRepository.findAll();
    }

    @Override
    public boolean delete(Filiere o) {
        try{
            FiliereRepository.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }


}
