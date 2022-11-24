package mk.ukim.finki.foodwizbackend.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.ukim.finki.foodwizbackend.domain.enumeration.Status;
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
@Table(name = "documents")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Document {

    public Document(String text, String documentId, String metadata, Corpus corpus, Status status) {
        this.originalId = documentId;
        this.text = text;
        this.metaData = metadata;
        this.corpus = corpus;
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalId;

    @Column(columnDefinition="TEXT")
    private String text;

    @Column(columnDefinition="TEXT")
    @JsonIgnore
    private String metaData;

    @Enumerated(EnumType.STRING)
    @Column(name="resourceType")
    private Status status;

    @CreationTimestamp
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime modifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "corpus_id", nullable = false)
    @JsonIgnore
    private Corpus corpus;

    @OneToMany(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<AnnotationSpan> annotationSpans = new ArrayList<>();

}
