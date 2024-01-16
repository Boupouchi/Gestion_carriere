package com.backend.controllers;



import com.backend.entities.Professor;
import com.backend.entities.Student;
import com.backend.entities.User;
import com.backend.repositories.UserRepository;
import com.backend.services.UserService;
import com.backend.utils.JwtTokenUtil;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService utilS;

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;


    @GetMapping("/all")
    public List<User> getAll(){
        return utilS.findAll();
    }



    @PostMapping("/register/professor")
    public ResponseEntity<?> registerProf(@RequestBody Professor user) {

        if (utilS.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>(Map.of("message", "User already exist"), HttpStatus.BAD_REQUEST);
        } else {
            String hashPWD = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
            user.setPassword(hashPWD);
            user.setActivate(false);
            utilS.create(user);
            return new ResponseEntity<>(Map.of("message", "Your account has been created successfully. You will receive an email when the admin activates your account"), HttpStatus.OK);
        }
    }

    @PostMapping("/register/student")
    public ResponseEntity<Object> registerStudent(@RequestBody Student user) {
        return registerUser(user, true);
    }

    private ResponseEntity<Object> registerUser(User user, boolean activate) {
        if (utilS.findByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>(Map.of("message", "User already exist"), HttpStatus.BAD_REQUEST);
        } else {
            String hashPWD = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
            user.setPassword(hashPWD);
            user.setActivate(activate);
            return ResponseEntity.ok(utilS.create(user));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User loginuser){
        User user = utilS.findByEmail(loginuser.getEmail());
        if (user == null)
            return new ResponseEntity<>(Map.of("message","invalid email or password"),HttpStatus.NOT_FOUND);

        else {
            boolean isRegister = BCrypt.checkpw(loginuser.getPassword(), user.getPassword());
            if(! isRegister)
                return new ResponseEntity<>(Map.of("message","invalid email or password"),HttpStatus.NOT_FOUND);
            else if(!user.isActivate())
                return new ResponseEntity<>(Map.of("message","Your account is not activated"),HttpStatus.NOT_FOUND);
            else{
                String role ;
                if(user instanceof Professor)
                    role = "professor";
                else if (user instanceof Student)
                    role = "student";
                else
                    role = "admin";
                String token = JwtTokenUtil.generateToken(user.getId()+user.getUserName());
                Map<String, Object> response = Map.of(
                        "message", "Authentication successful",
                        "role",role,
                        "token", token,
                        "email", user.getEmail(),
                        "id",user.getId()
                );
                return ResponseEntity.ok(response);
            }
        }
    }

    @DeleteMapping("/delete/student/{profId}/{studentId}")
    public ResponseEntity<Object> delete(@RequestHeader("Authorization") String token, @PathVariable long profId,@PathVariable long studentId) {
        User user = utilS.findById(profId);
        User user1 = utilS.findById(studentId);
        System.out.println(token);
        if(user == null)
            return new ResponseEntity<>(Map.of("message","user does not exist"), HttpStatus.NOT_FOUND);
        else if(token == null)
            return new ResponseEntity<>(Map.of("message","token is empty"),HttpStatus.UNAUTHORIZED);
        else if(!JwtTokenUtil.validateToken(token.substring(7),user.getId()+user.getUserName()))
            return new ResponseEntity<>(Map.of("message","invalid token"),HttpStatus.UNAUTHORIZED);
        else{
            utilS.delete(user1);
            return new ResponseEntity<>(Map.of("message", "user deleted successfully"), HttpStatus.OK);
        }
    }

    @PostMapping("/activate/{id}")
    public ResponseEntity<Object> activateCompte(@PathVariable long id){
        User user = utilS.findById(id);
        if(user == null)
            return new ResponseEntity<>(Map.of("message","user does not exist"), HttpStatus.NOT_FOUND);
        else {
            if(user.isActivate()) {
                user.setActivate(false);
                utilS.update(user);
                return new ResponseEntity<>(Map.of("message", "User disactivated successfully "), HttpStatus.OK);
            }
            else{
                user.setActivate(true);
                utilS.update(user);
                 return new ResponseEntity<>(Map.of("message", "user activated successfully "), HttpStatus.OK);
            }
        }
    }





    @GetMapping("/allProfessor")
    public List<Professor> getAllProf(){
        return utilS.findAllProfessors();
    }

    @GetMapping("/allStudent")
    public List<Student> getAllStudent(){
        return utilS.findAllStudents();
    }



    @GetMapping("/{id}")
    public ResponseEntity<Object> getbyid(@PathVariable long id){
        User user =  userService.findById(id);
        if(user == null)
            return new ResponseEntity<>(Map.of("message","User does not exist"), HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(user);
    }


    @PutMapping("/update/professor/{id}")
    public ResponseEntity<Object> updateid(@PathVariable long id, @RequestBody Professor user0){
        Professor user = (Professor) userService.findById(id);
        if(user == null)
            return new ResponseEntity<>(Map.of("message","User does not exist"), HttpStatus.NOT_FOUND);
        else{
            user.setFirstName(user0.getFirstName());
            user.setLastName(user0.getLastName());
            user.setUserName(user0.getUserName());
            user.setDatadenaissance(user0.getDatadenaissance());
            user.setPhoto(user0.getPhoto());
            userService.update(user);
            return ResponseEntity.ok(user);
        }

    }
    @PutMapping("/update/student/{id}")
    public ResponseEntity<Object> updateid(@PathVariable long id, @RequestBody Student user0){
        Student user = (Student) userService.findById(id);
        if(user == null)
            return new ResponseEntity<>(Map.of("message","User does not exist"), HttpStatus.NOT_FOUND);
        else{
            user.setFirstName(user0.getFirstName());
            user.setLastName(user0.getLastName());
            user.setUserName(user0.getUserName());
            user.setPhoto(user0.getPhoto());
            userService.update(user);
            return ResponseEntity.ok(user);
        }
    }







}
