package mk.ukim.finki.foodwizbackend.repository;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.Corpus;
import mk.ukim.finki.foodwizbackend.domain.models.CorpusDataset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CorpusDatasetRepository extends JpaRepository<CorpusDataset, Long> {
}
