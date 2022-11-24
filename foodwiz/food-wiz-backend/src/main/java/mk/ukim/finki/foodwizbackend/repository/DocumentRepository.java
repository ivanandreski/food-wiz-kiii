package mk.ukim.finki.foodwizbackend.repository;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
}
