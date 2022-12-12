package mk.ukim.finki.foodwizbackend.web.dto.in;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RegisterCredentials {
    private String email;
    private String password;
    private String username;
    private String firstName;
    private String lastName;
}
