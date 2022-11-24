package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.exceptions.CorpusNotFoundException;
import mk.ukim.finki.foodwizbackend.domain.models.Corpus;
import mk.ukim.finki.foodwizbackend.domain.projections.DocumentProjection;
import mk.ukim.finki.foodwizbackend.repository.CorpusRepository;
import mk.ukim.finki.foodwizbackend.repository.DocumentRepository;
import mk.ukim.finki.foodwizbackend.service.CorpusService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CorpusServiceImpl implements CorpusService {

    private final CorpusRepository corpusRepository;
    private final DocumentRepository documentRepository;

    public CorpusServiceImpl(CorpusRepository corpusRepository, DocumentRepository documentRepository) {
        this.corpusRepository = corpusRepository;
        this.documentRepository = documentRepository;
    }

    @Override
    public List<Corpus> getAll() {
        return corpusRepository.findAll();
    }

    @Override
    public Page<DocumentProjection> get(Long id, Integer perPage, Integer page) {
        Corpus corpus = corpusRepository.findById(id).orElseThrow(() -> new CorpusNotFoundException(id));
        Pageable pageable = PageRequest.of(page, perPage, Sort.by("originalId"));
        return documentRepository.findDocumentsByCorpus(corpus, pageable);
    }
}
