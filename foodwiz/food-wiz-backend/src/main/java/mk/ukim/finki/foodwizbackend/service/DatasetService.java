package mk.ukim.finki.foodwizbackend.service;

import mk.ukim.finki.foodwizbackend.domain.models.Dataset;

import java.util.List;

public interface DatasetService {

    List<Dataset> getAll();
}
