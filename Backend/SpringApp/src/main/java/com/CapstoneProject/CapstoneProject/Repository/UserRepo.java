package com.CapstoneProject.CapstoneProject.Repository;

import com.CapstoneProject.CapstoneProject.Model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepo extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    void deleteByUsername(String username);

    User findByUsername(String username);
}