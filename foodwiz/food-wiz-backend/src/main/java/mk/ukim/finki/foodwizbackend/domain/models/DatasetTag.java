package mk.ukim.finki.foodwizbackend.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "dataset_tags")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DatasetTag {

    public DatasetTag(String tagId, String tagName, Dataset dataset) {
        this.tagId = tagId;
        this.tagName = tagName;
        link = "";
        description = "";
        this.dataset = dataset;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tagId;

    private String tagName;

    private String link;

    private String description;

    @CreationTimestamp
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime modifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dataset_id", nullable = false)
    private Dataset dataset;

    @OneToMany(mappedBy = "datasetTag", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<AnnotationSpanDatasetTag> annotationSpanDatasetTags = new ArrayList<>();
}
