package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.repository.AnnotationSpanDatasetTagRepository;
import mk.ukim.finki.foodwizbackend.service.AnnotationSpanDatasetTagService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnotationSpanDatasetTagServiceImpl implements AnnotationSpanDatasetTagService {

    private final AnnotationSpanDatasetTagRepository annotationSpanDatasetTagRepository;

    public AnnotationSpanDatasetTagServiceImpl(AnnotationSpanDatasetTagRepository annotationSpanDatasetTagRepository) {
        this.annotationSpanDatasetTagRepository = annotationSpanDatasetTagRepository;
    }

    @Override
    public List<String> getAllSources() {
        return annotationSpanDatasetTagRepository.findAllSources();
    }


}
