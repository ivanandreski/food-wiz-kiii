package mk.ukim.finki.foodwizbackend.repository;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnotationSpanDatasetTagRepository extends JpaRepository<AnnotationSpanDatasetTag, Long> {

    @Query(value = "select distinct(ad.source) from AnnotationSpanDatasetTag ad")
    List<String> findAllSources();

    // todo: add source and dataset filters
    @Query(value = "select asdt.* " +
            " from annotation_span_dataset_tags asdt" +
            " left join dataset_tags dt on dt.id = asdt.dataset_tag_id " +
            " left join annotation_spans as2 on as2.id = asdt.annotation_span_id " +
            " where as2.document_id = :document_id ",
            nativeQuery = true
    )
    List<AnnotationSpanDatasetTag> getByDocumentAndDatasetAndSource(@Param("document_id") Long documentId);
}
