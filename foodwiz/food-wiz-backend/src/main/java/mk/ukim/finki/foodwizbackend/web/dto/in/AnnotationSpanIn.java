package mk.ukim.finki.foodwizbackend.web.dto.in;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AnnotationSpanIn {
  private Character startChar;
  private Character endChar;
  private String text;
  private Long documentId;
}
