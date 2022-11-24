package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.models.Corpus;
import mk.ukim.finki.foodwizbackend.service.CorpusService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CorpusServiceImpl implements CorpusService {
    @Override
    public List<Corpus> getAll() {
        return null;
    }

    @Override
    public Corpus get(Long id, Integer perPage, Integer page) {
        return null;
    }
}
