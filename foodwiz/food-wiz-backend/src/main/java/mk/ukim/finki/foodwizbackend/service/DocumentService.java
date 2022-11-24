package mk.ukim.finki.foodwizbackend.service;

import mk.ukim.finki.foodwizbackend.domain.models.Document;

public interface DocumentService {

    Document get(Long id);

    Document validate(Long id);


}
