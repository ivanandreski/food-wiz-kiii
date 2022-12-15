package mk.ukim.finki.foodwizbackend.repository;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpan;
import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnnotationSpanRepository extends JpaRepository<AnnotationSpan, Long> {

    Optional<AnnotationSpan> findByStartCharAndEndCharAndDocument(Integer startChar, Integer endChar, Document document);
}
