package mk.ukim.finki.foodwizbackend.domain.dto.out;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImportResponseDto {

    private String message;
    private Integer code;
}
