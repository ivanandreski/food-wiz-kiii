package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.models.Dataset;
import mk.ukim.finki.foodwizbackend.repository.DatasetRepository;
import mk.ukim.finki.foodwizbackend.service.DatasetService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatasetServiceImpl implements DatasetService {

    private final DatasetRepository datasetRepository;

    public DatasetServiceImpl(DatasetRepository datasetRepository) {
        this.datasetRepository = datasetRepository;
    }

    @Override
    public List<Dataset> getAll() {
        return datasetRepository.findAll();
    }
}
