package mk.ukim.finki.foodwizbackend.service;

import mk.ukim.finki.foodwizbackend.domain.models.DatasetTag;

import java.util.List;
import java.util.Map;

public interface DatasetTagService {

    Map<String, List<DatasetTag>> getAll(String datasets);
}
