package com.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dao.IDao;
import com.backend.entities.Cours;
import com.backend.repositories.CoursRepository;

@Service
public class CoursService implements IDao<Cours> {
    @Autowired
    CoursRepository CoursRepository;

    @Override
    public Cours create(Cours o) {
        return CoursRepository.save(o);
    }

    @Override
    public Cours update(Cours o) {
        return CoursRepository.save(o);
    }

    @Override
    public Cours findById(long id) {
        return CoursRepository.findById(id).orElse(null);
    }

    @Override
    public List<Cours> findAll() {
        return CoursRepository.findAll();
    }

    @Override
    public boolean delete(Cours o) {
        try{
            CoursRepository.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }


}
