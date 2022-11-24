package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.domain.models.Document;
import mk.ukim.finki.foodwizbackend.service.DocumentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/document")
public class DocumentController {

    private DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/{id}")
    public Document getDocument(@PathVariable Long id, @RequestParam String datasetString, @RequestParam String sourceString) {
        return documentService.get(id);
    }

    @PutMapping("/{id}/validate")
    public Document validateDocument(@PathVariable Long id) {
        return documentService.validate(id);
    }

    // fetch sources mozda e bolje vo drug controller
}
