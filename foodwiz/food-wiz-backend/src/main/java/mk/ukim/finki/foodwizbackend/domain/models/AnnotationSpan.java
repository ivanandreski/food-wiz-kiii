package mk.ukim.finki.foodwizbackend.domain.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "annotation_spans")
public class AnnotationSpan {

    public AnnotationSpan(Integer startChar, Integer endChar, String text, Document document) {
        this.startChar = startChar;
        this.endChar = endChar;
        this.text = text;
        this.document = document;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Integer startChar;

    private Integer endChar;

    private String text;

    @CreationTimestamp
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime modifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false)
    private Document document;

    @OneToMany(mappedBy = "annotationSpan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnnotationSpanDatasetTag> annotationSpanDatasetTags = new ArrayList<>();
}
