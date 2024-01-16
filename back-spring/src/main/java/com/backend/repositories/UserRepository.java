package com.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.entities.Professor;
import com.backend.entities.Student;
import com.backend.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findUserByEmail(String email);
    @Query("SELECT u FROM User u WHERE TYPE(u) = Professor")
    List<Professor> findAllProfessors();

    @Query("SELECT u FROM User u WHERE TYPE(u) = Student")
    List<Student> findAllStudents();


 //   @Query("SELECT s FROM Student s WHERE s.group.id = :groupId")
 //   List<Student> findStudentsByGroup(@Param("groupId") Long groupId);

    //@Query("SELECT s.group.pws FROM Student s WHERE s.id = :studentId")
    //List<PW> findPwByStudent(@Param("studentId") Long studentId);





}
