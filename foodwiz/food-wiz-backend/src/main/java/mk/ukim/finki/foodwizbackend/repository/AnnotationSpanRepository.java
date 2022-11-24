package mk.ukim.finki.foodwizbackend.repository;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpan;
import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnotationSpanRepository extends JpaRepository<AnnotationSpan, Long> {
}
