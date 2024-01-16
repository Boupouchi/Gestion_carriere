package com.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dao.IDao;
import com.backend.entities.Professor;
import com.backend.entities.Student;
import com.backend.entities.User;
import com.backend.repositories.UserRepository;

@Service
public class UserService implements IDao<User> {

    @Autowired
    UserRepository userR;

    @Override
    public List<User> findAll() {
        return userR.findAll();
    }

    @Override
    public User findById(long id) {
        return userR.findById(id).orElse(null);
    }

    @Override
    public User create(User o) {
        return userR.save(o);
    }

    @Override
    public User update(User o) {
        return userR.save(o);
    }

    @Override
    public boolean delete(User o) {
        try {
            userR.delete(o);
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    public User findByEmail(String email){
        return userR.findUserByEmail(email);
    }

    public List<Professor> findAllProfessors(){
        return userR.findAllProfessors();
    }
    public List<Student> findAllStudents(){
        return userR.findAllStudents();
    }
}
