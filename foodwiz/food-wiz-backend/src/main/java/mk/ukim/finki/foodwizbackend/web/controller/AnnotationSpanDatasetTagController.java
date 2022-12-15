package mk.ukim.finki.foodwizbackend.web.controller;

import mk.ukim.finki.foodwizbackend.service.AnnotationSpanDatasetTagService;
import mk.ukim.finki.foodwizbackend.web.dto.in.AnnotationSpanDatasetTagDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/annotationSpanDatasetTag")
@CrossOrigin
public class AnnotationSpanDatasetTagController {

    private final AnnotationSpanDatasetTagService annotationSpanDatasetTagService;

    public AnnotationSpanDatasetTagController(AnnotationSpanDatasetTagService annotationSpanDatasetTagService) {
        this.annotationSpanDatasetTagService = annotationSpanDatasetTagService;
    }

    @PutMapping("/{tagId}")
    public ResponseEntity<Object> addTag(@RequestBody AnnotationSpanDatasetTagDto body, @PathVariable Long tagId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return new ResponseEntity<>(annotationSpanDatasetTagService.addTag(body, tagId, username), HttpStatus.OK);
    }

    @PutMapping("/markDelete/{tagId}")
    public ResponseEntity<Object> deleteTag(@RequestBody AnnotationSpanDatasetTagDto body, @PathVariable String tagId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return new ResponseEntity<>(annotationSpanDatasetTagService.markDeleteTag(body, tagId, username), HttpStatus.OK);
    }
}
