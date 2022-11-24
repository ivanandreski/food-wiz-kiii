package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.domain.models.Dataset;
import mk.ukim.finki.foodwizbackend.service.DatasetService;
import mk.ukim.finki.foodwizbackend.service.ImportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/dataset")
@CrossOrigin
public class DatasetController {

    private final ImportService importService;
    private final DatasetService datasetService;

    public DatasetController(ImportService importService, DatasetService datasetService) {
        this.importService = importService;
        this.datasetService = datasetService;
    }

    @PostMapping("/convert")
    public ResponseEntity<String> convert(@RequestPart("files") MultipartFile[] files) {
        return importService.importDataset(files);
    }

    // todo:
    // /dataset/
    // get
    // gi zema site
    @GetMapping
    public List<Dataset> getDatasets() {
        return datasetService.getAll();
    }

    // /corpus/{documentId}/datasets
    // get
}
