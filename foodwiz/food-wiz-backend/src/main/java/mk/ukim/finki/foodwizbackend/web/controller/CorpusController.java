package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.domain.dto.out.DatasetsByCorpusDto;
import mk.ukim.finki.foodwizbackend.domain.models.Corpus;
import mk.ukim.finki.foodwizbackend.service.CorpusService;
import mk.ukim.finki.foodwizbackend.service.ImportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/corpus")
@CrossOrigin
public class CorpusController {

    private final CorpusService corpusService;
    private final ImportService importService;

    public CorpusController(CorpusService corpusService, ImportService importService) {
        this.corpusService = corpusService;
        this.importService = importService;
    }

    @GetMapping
    public List<Corpus> getCorpora() {
        return corpusService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCorpus(@PathVariable Long id, @RequestParam Integer perPage, @RequestParam Integer page) {
        return new ResponseEntity<>(corpusService.get(id, perPage, page), HttpStatus.OK);
    }

    @GetMapping("/{documentId}/datasets")
    public DatasetsByCorpusDto getDatasetsForCorpus(@PathVariable Long documentId) {
        return corpusService.getDatasetsByCorpus(documentId);
    }

    @PostMapping("/convert")
    public ResponseEntity<String> convertJson(@RequestParam("files") MultipartFile file) {
        return importService.importCorpus(file);
    }
}
