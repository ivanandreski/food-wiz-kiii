package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.domain.dto.out.DocumentResponseDto;
import mk.ukim.finki.foodwizbackend.domain.models.Document;
import mk.ukim.finki.foodwizbackend.service.AnnotationSpanDatasetTagService;
import mk.ukim.finki.foodwizbackend.service.DocumentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/document")
@CrossOrigin
public class DocumentController {

    private final DocumentService documentService;
    private final AnnotationSpanDatasetTagService annotationSpanDatasetTagService;

    public DocumentController(DocumentService documentService, AnnotationSpanDatasetTagService annotationSpanDatasetTagService) {
        this.documentService = documentService;
        this.annotationSpanDatasetTagService = annotationSpanDatasetTagService;
    }

    @GetMapping("/{id}")
    public DocumentResponseDto getDocument(@PathVariable Long id, @RequestParam String datasets, @RequestParam String sources) {
        return documentService.get(id, datasets, sources);
    }

    @PutMapping("/{id}/validate")
    public Document validateDocument(@PathVariable Long id) {
        return documentService.validate(id);
    }

    @GetMapping("/sources")
    public List<String> getAllSources() {
        return annotationSpanDatasetTagService.getAllSources();
    }
}
