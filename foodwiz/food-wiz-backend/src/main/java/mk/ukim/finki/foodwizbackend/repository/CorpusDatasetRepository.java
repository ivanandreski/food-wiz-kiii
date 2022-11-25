package mk.ukim.finki.foodwizbackend.repository;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.Corpus;
import mk.ukim.finki.foodwizbackend.domain.models.CorpusDataset;
import mk.ukim.finki.foodwizbackend.domain.models.Dataset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CorpusDatasetRepository extends JpaRepository<CorpusDataset, Long> {

    List<CorpusDataset> findCorpusDatasetsByCorpus(Corpus corpus);
}
