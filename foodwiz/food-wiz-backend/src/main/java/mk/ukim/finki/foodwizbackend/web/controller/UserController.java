package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.domain.models.User;
import mk.ukim.finki.foodwizbackend.repository.UserRepository;
import mk.ukim.finki.foodwizbackend.security.JWTUtil;
import mk.ukim.finki.foodwizbackend.web.dto.in.LoginCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    // todo: /users/signup
    // post
    // email, password, fullName

    // todo: /users/login
    // post
    // email, password

    // todo: /users/getEmail
    // getRequest

    @Autowired
    private UserRepository userRepo;
    @Autowired private JWTUtil jwtUtil;
    @Autowired private AuthenticationManager authManager;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public Map<String, Object> registerHandler(@RequestBody User user){
        String encodedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPass);
        user = userRepo.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        return Collections.singletonMap("jwt-token", token);
    }

    @PostMapping("/login")
    public Map<String, Object> loginHandler(@RequestBody LoginCredentials body){
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword());

            authManager.authenticate(authInputToken);

            String token = jwtUtil.generateToken(body.getEmail());

            return Collections.singletonMap("jwt-token", token);
        }catch (AuthenticationException authExc){
            throw new RuntimeException("Invalid Login Credentials");
        }
    }

    @GetMapping("/getEmail")
    public String getEmail(){
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepo.findByUsername(username).get().getUsername();
    }
}
