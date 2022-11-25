package mk.ukim.finki.foodwizbackend.service;

import mk.ukim.finki.foodwizbackend.domain.dto.out.DocumentResponseDto;
import mk.ukim.finki.foodwizbackend.domain.models.Document;

public interface DocumentService {

    DocumentResponseDto get(Long id, String datasets, String sources);

    Document validate(Long id);


}
