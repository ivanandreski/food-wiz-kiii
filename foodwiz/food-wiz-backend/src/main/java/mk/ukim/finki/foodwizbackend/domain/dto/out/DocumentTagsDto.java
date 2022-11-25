package mk.ukim.finki.foodwizbackend.domain.dto.out;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DocumentTagsDto {

    private String text;
    private List<AnnotationSpanDatasetTagSpacyDto> annotationSpansDatasetTags;

    public DocumentTagsDto(String documentText, List<AnnotationSpanDatasetTagSpacyDto> tags) {
        text = documentText;
        annotationSpansDatasetTags = tags;
    }

    public String toJSON() {
        StringBuilder json = new StringBuilder();
        json.append("{\n");
        json.append("\"text\": \"").append(text).append("\",\n");
        json.append("\"annotationSpansDatasetTags\":").append(annotationSpansDatasetTags.toString());
        json.append("}\n");

        return json.toString();
    }
}
