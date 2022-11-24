package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.service.ImportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/dataset")
public class DatasetController {

    private final ImportService importService;

    public DatasetController(ImportService importService) {
        this.importService = importService;
    }

    @PostMapping("/convert")
    public ResponseEntity<String> convert(@RequestPart("files") MultipartFile[] files) {
        return importService.importDataset(files);
    }
}
