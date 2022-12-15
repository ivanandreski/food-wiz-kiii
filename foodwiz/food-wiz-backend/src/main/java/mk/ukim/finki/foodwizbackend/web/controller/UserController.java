package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.domain.models.User;
import mk.ukim.finki.foodwizbackend.repository.UserRepository;
import mk.ukim.finki.foodwizbackend.security.JWTUtil;
import mk.ukim.finki.foodwizbackend.web.dto.in.LoginCredentials;
import mk.ukim.finki.foodwizbackend.web.dto.in.RegisterCredentials;
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
    @Autowired
    private UserRepository userRepo;
    @Autowired private JWTUtil jwtUtil;
    @Autowired private AuthenticationManager authManager;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public Map<String, Object> registerHandler(@RequestBody RegisterCredentials registerCredentials){
        String encodedPass = passwordEncoder.encode(registerCredentials.getPassword());
        User user = new User();
        user.setPassword(encodedPass);
        user.setEmail(registerCredentials.getEmail());
        user.setUsername(registerCredentials.getEmail());
        user.setFirstName(registerCredentials.getEmail());
        user.setLastName(registerCredentials.getEmail());
        user = userRepo.save(user);
        String token = jwtUtil.generateToken(user.getUsername());
        return Collections.singletonMap("jwt_token", token);
    }

    @PostMapping("/login")
    public Map<String, Object> loginHandler(@RequestBody LoginCredentials body){
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword());

            authManager.authenticate(authInputToken);

            String token = jwtUtil.generateToken(body.getUsername());

            return Collections.singletonMap("jwt_token", token);
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
