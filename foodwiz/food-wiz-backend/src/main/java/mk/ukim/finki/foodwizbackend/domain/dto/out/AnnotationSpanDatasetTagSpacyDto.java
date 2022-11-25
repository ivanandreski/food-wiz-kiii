package mk.ukim.finki.foodwizbackend.domain.dto.out;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;

@Getter
@Setter
@NoArgsConstructor
public class AnnotationSpanDatasetTagSpacyDto {

    private String annotation_span_id;
    private String dataset_tag_id;
    private String tag;
    private String source;
    private Boolean removed;
    private String removedBy;
    private Integer start_char;
    private Integer end_char;
    private String dataset_title;

    public AnnotationSpanDatasetTagSpacyDto(AnnotationSpanDatasetTag asdt) {
        annotation_span_id = "";
        dataset_tag_id = asdt.getDatasetTag().getTagId();
        tag = asdt.getTag();
        source = asdt.getSource();
        removed = asdt.getRemoved();
        removedBy = asdt.getRemovedBy();
        start_char = asdt.getAnnotationSpan().getStartChar();
        end_char = asdt.getAnnotationSpan().getEndChar();
        dataset_title = asdt.getDatasetTag().getDataset().getTitle();
    }

    @Override
    public String toString() {
        return "{" +
                "\"annotation_span_id\": \"" + annotation_span_id + "\"," +
                "\"dataset_tag_id\": \"" + dataset_tag_id + "\"," +
                "\"tag\": \"" + tag + "\"," +
                "\"source\": \"" + source + "\"," +
                "\"removed\": \"" + removed + "\"," +
                "\"start_char\": \"" + start_char + "\"," +
                "\"end_char\": \"" + end_char + "\"," +
                "\"dataset_title\": \"" + dataset_title + "\"," +
                "\"removedBy\": \"" + removedBy + "\"" +
                '}';
    }
}
