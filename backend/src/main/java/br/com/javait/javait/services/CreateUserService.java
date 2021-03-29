package br.com.javait.javait.services;

import br.com.javait.javait.model.User;
import br.com.javait.javait.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CreateUserService {
    @Autowired
    UserRepository userRepository;

    public ResponseEntity<User> create(User user) {
        User u = new User();
        u.setName(user.getName());
        u.setEmail(user.getEmail());

        String encoded = new BCryptPasswordEncoder().encode(user.getPassword());
        u.setPassword(encoded);
        userRepository.save(u);

        return ResponseEntity.ok().body(user);
    }
}
