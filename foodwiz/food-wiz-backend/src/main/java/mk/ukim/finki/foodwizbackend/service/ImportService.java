package mk.ukim.finki.foodwizbackend.service;

import mk.ukim.finki.foodwizbackend.domain.dto.out.ImportResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImportService {

    ResponseEntity<String> importCorpus(MultipartFile file);

    ResponseEntity<String> importDataset(MultipartFile[] files);
}
