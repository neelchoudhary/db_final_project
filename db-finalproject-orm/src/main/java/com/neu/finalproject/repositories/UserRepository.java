package com.neu.finalproject.repositories;

import com.neu.finalproject.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    @Query(value = "SELECT * FROM users", nativeQuery = true)
    public List<User> findAllUsers();

    @Query(value = "SELECT * FROM users WHERE id=:userId", nativeQuery = true)
    public User findUserById(@Param("userId") Integer id);
}
