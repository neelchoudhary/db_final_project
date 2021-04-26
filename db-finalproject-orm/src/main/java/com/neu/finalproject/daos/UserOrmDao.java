package com.neu.finalproject.daos;

import com.neu.finalproject.models.User;
import com.neu.finalproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserOrmDao {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/api/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    
    @GetMapping("/api/users")
    public List<User> findAllUsers() {
        return userRepository.findAllUsers();
    }

    
    @GetMapping("/api/users/{userId}")
    public User findUserById(@PathVariable("userId") Integer id) {
        return userRepository.findUserById(id);
    }

    @PutMapping("/api/users/{userId}")
    public User updateUser(@PathVariable("userId") Integer id, @RequestBody User userUpdates) {
        User user = userRepository.findUserById(id);
        user.setFirstName(userUpdates.getFirstName());
        user.setLastName(userUpdates.getLastName());
        user.setEmail(userUpdates.getEmail());
        return userRepository.save(user);
    }

    @DeleteMapping("/api/users/{userId}")
    public void deleteUser(@PathVariable("userId") Integer id) {
        userRepository.deleteById(id);
    }
}