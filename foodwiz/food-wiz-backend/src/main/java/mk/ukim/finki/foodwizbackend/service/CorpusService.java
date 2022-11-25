package mk.ukim.finki.foodwizbackend.service;

import mk.ukim.finki.foodwizbackend.domain.dto.out.DatasetsByCorpusDto;
import mk.ukim.finki.foodwizbackend.domain.models.Corpus;
import mk.ukim.finki.foodwizbackend.domain.projections.DocumentProjection;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CorpusService {

    List<Corpus> getAll();

    Page<DocumentProjection> get(Long id, Integer perPage, Integer page);

    DatasetsByCorpusDto getDatasetsByCorpus(Long documentId);
}
