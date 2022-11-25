package mk.ukim.finki.foodwizbackend.domain.dto.out;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.foodwizbackend.domain.models.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DocumentResponseDto {

    private String tokens;
    private Document document;
}
