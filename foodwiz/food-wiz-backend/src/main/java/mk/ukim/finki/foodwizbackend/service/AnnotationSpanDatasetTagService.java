package mk.ukim.finki.foodwizbackend.service;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.web.dto.in.AnnotationSpanDatasetTagDto;

import java.util.List;

public interface AnnotationSpanDatasetTagService {

    List<String> getAllSources();

    AnnotationSpanDatasetTag addTag(AnnotationSpanDatasetTagDto dto, Long tagId, String username);

    AnnotationSpanDatasetTag markDeleteTag(AnnotationSpanDatasetTagDto dto, String tagId, String username);
}
