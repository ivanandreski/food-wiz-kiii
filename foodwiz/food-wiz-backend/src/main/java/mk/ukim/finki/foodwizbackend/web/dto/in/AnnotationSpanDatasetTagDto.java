package mk.ukim.finki.foodwizbackend.web.dto.in;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationSpanDatasetTagDto {

    private Integer startChar;

    private String text;

    private Long documentId;

}
