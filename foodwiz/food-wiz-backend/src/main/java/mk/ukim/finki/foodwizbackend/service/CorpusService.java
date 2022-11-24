package mk.ukim.finki.foodwizbackend.service;

import mk.ukim.finki.foodwizbackend.domain.models.Corpus;

import java.util.List;

public interface CorpusService {

    List<Corpus> getAll();

    Corpus get(Long id, Integer perPage, Integer page);
}
