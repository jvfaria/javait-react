package br.com.javait.javait.controller;

import br.com.javait.javait.model.User;
import br.com.javait.javait.services.CreateUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@RestController()
public class UserController {
    @Autowired
    CreateUserService createUserService;



    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<User> newUser(@RequestBody User user)  {
        createUserService.create(user);
        return ResponseEntity.status(201).build();
    }
}
