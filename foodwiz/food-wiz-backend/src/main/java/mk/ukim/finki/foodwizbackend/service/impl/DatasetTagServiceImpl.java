package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.models.Dataset;
import mk.ukim.finki.foodwizbackend.domain.models.DatasetTag;
import mk.ukim.finki.foodwizbackend.repository.DatasetRepository;
import mk.ukim.finki.foodwizbackend.repository.DatasetTagRepository;
import mk.ukim.finki.foodwizbackend.service.DatasetTagService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DatasetTagServiceImpl implements DatasetTagService {

    private final DatasetTagRepository datasetTagRepository;
    private final DatasetRepository datasetRepository;

    public DatasetTagServiceImpl(DatasetTagRepository datasetTagRepository, DatasetRepository datasetRepository) {
        this.datasetTagRepository = datasetTagRepository;
        this.datasetRepository = datasetRepository;
    }

    @Override
    public Map<String, List<DatasetTag>> getAll(String datasets) {
        List<DatasetTag> tags = datasetTagRepository.findAll();
        if(datasets == null || datasets.equals("empty"))
            return new HashMap<>();

        Map<String, List<DatasetTag>> response = new HashMap<>();
        if(datasets.equals("\\s+")) {
            Arrays.stream(datasets.split(","))
                    .forEach(split -> response.put(split, datasetTagRepository.getDatasetTagsByDatasetId(Long.parseLong(split))));
        }
        else {
            datasetRepository.findAll()
                    .stream()
                    .map(Dataset::getId)
                    .forEach(split -> response.put(split.toString(), datasetTagRepository.getDatasetTagsByDatasetId(split)));
        }

        return response;
    }

    private boolean containsDataset(String[] datasetSplit, Long datasetId) {
        for (int i=0; i<datasetSplit.length -1; i++) {
            try {
                Long id = Long.parseLong(datasetSplit[i]);
                if(id.equals(datasetId))
                    return true;
            } catch(Exception ignored) {
            }
        }

        return false;
    }
}
