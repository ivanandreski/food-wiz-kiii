package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.models.DatasetTag;
import mk.ukim.finki.foodwizbackend.repository.DatasetTagRepository;
import mk.ukim.finki.foodwizbackend.service.DatasetTagService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DatasetTagServiceImpl implements DatasetTagService {

    private final DatasetTagRepository datasetTagRepository;

    public DatasetTagServiceImpl(DatasetTagRepository datasetTagRepository) {
        this.datasetTagRepository = datasetTagRepository;
    }

    @Override
    public Map<String, List<DatasetTag>> getAll(String datasets) {
        List<DatasetTag> tags = datasetTagRepository.findAll();
        if(datasets == null || datasets.equals("empty"))
            return new HashMap<>();

        String[] datasetSplit = datasets.split(",");
        Map<String, List<DatasetTag>> response = new HashMap<>();
        for(int i=0; i<datasetSplit.length - 1; i++) {
            response.put(datasetSplit[i], datasetTagRepository.getDatasetTagsByDatasetId(Long.parseLong(datasetSplit[i])));
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
