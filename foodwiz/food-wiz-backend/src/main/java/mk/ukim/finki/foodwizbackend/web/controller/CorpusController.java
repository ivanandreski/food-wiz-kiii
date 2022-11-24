package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.domain.models.Corpus;
import mk.ukim.finki.foodwizbackend.service.CorpusService;
import mk.ukim.finki.foodwizbackend.service.ImportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/corpus")
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
    public Corpus getCorpus(@PathVariable Long id, @RequestParam Integer perPage, @RequestParam Integer page) {
        return corpusService.get(id, perPage, page);
    }

    @PostMapping("/convert")
    public ResponseEntity<String> convertJson(@RequestParam("file") MultipartFile file) {
        // todo:
        return importService.importCorpus(file);
    }
}
