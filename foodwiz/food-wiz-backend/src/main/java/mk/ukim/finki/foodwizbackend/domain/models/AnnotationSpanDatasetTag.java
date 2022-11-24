package mk.ukim.finki.foodwizbackend.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "annotation_span_dataset_tags")
public class AnnotationSpanDatasetTag {

    public AnnotationSpanDatasetTag(DatasetTag datasetTag, AnnotationSpan annotationSpan, String tagName, String source) {
        this.datasetTag = datasetTag;
        this.annotationSpan = annotationSpan;
        this.tag = tagName;
        this.source = source;
        this.removed = false;
        this.removedBy = "";
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "annotation_span_id", nullable = false)
    private AnnotationSpan annotationSpan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dataset_tag_id", nullable = false)
    private DatasetTag datasetTag;

    private String tag;

    private String source;

    private Boolean removed;

    private String removedBy;

    @CreationTimestamp
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime modifiedAt;
}
