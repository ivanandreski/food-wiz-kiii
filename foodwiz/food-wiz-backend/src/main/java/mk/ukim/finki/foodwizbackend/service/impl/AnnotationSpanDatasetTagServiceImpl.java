package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.exceptions.DocumentNotFoundException;
import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpan;
import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.DatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.Document;
import mk.ukim.finki.foodwizbackend.repository.AnnotationSpanDatasetTagRepository;
import mk.ukim.finki.foodwizbackend.repository.AnnotationSpanRepository;
import mk.ukim.finki.foodwizbackend.repository.DatasetTagRepository;
import mk.ukim.finki.foodwizbackend.repository.DocumentRepository;
import mk.ukim.finki.foodwizbackend.service.AnnotationSpanDatasetTagService;
import mk.ukim.finki.foodwizbackend.web.dto.in.AnnotationSpanDatasetTagDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnotationSpanDatasetTagServiceImpl implements AnnotationSpanDatasetTagService {

    private final AnnotationSpanDatasetTagRepository annotationSpanDatasetTagRepository;
    private final AnnotationSpanRepository annotationSpanRepository;
    private final DatasetTagRepository datasetTagRepository;
    private final DocumentRepository documentRepository;

    public AnnotationSpanDatasetTagServiceImpl(AnnotationSpanDatasetTagRepository annotationSpanDatasetTagRepository, AnnotationSpanRepository annotationSpanRepository, DatasetTagRepository datasetTagRepository, DocumentRepository documentRepository) {
        this.annotationSpanDatasetTagRepository = annotationSpanDatasetTagRepository;
        this.annotationSpanRepository = annotationSpanRepository;
        this.datasetTagRepository = datasetTagRepository;
        this.documentRepository = documentRepository;
    }

    @Override
    public List<String> getAllSources() {
        return annotationSpanDatasetTagRepository.findAllSources();
    }

    @Override
    public AnnotationSpanDatasetTag addTag(AnnotationSpanDatasetTagDto dto, Long tagId, String username) {
        int endChar = dto.getStartChar() + dto.getText().length();
        Document document = documentRepository
                .findById(dto.getDocumentId())
                .orElseThrow(() -> new DocumentNotFoundException(dto.getDocumentId()));
        AnnotationSpan annotationSpan = annotationSpanRepository
                .findByStartCharAndEndCharAndDocument(dto.getStartChar(), endChar, document)
                .orElse(null);
        DatasetTag datasetTag = datasetTagRepository
                .findById(tagId)
                .orElseThrow(() -> new RuntimeException("Dataset tag not found"));
        AnnotationSpanDatasetTag annotationSpanDatasetTag = annotationSpanDatasetTagRepository
                .findByAnnotationSpanAndDatasetTag(annotationSpan, datasetTag)
                .orElse(null);

        if(annotationSpanDatasetTag != null) {
            annotationSpanDatasetTag.setRemoved(false);
            return annotationSpanDatasetTagRepository.save(annotationSpanDatasetTag);
        }
        if(annotationSpan == null) {
            annotationSpan = new AnnotationSpan(dto.getStartChar(), endChar, dto.getText(), document);
            annotationSpan = annotationSpanRepository.save(annotationSpan);
        }

        annotationSpanDatasetTag = new AnnotationSpanDatasetTag(datasetTag, annotationSpan, datasetTag.getTagName(), username);
        return annotationSpanDatasetTagRepository.save(annotationSpanDatasetTag);
    }

    @Override
    public AnnotationSpanDatasetTag markDeleteTag(AnnotationSpanDatasetTagDto dto, String tagId, String username) {
        int endChar = dto.getStartChar() + dto.getText().length();
        Document document = documentRepository
                .findById(dto.getDocumentId())
                .orElseThrow(() -> new DocumentNotFoundException(dto.getDocumentId()));
        AnnotationSpan annotationSpan = annotationSpanRepository
                .findByStartCharAndEndCharAndDocument(dto.getStartChar(), endChar, document)
                .orElseThrow(() -> new RuntimeException("Annotation Span not found"));
        DatasetTag datasetTag = datasetTagRepository
                .findByTagId(tagId)
                .orElseThrow(() -> new RuntimeException("Dataset tag not found"));
        AnnotationSpanDatasetTag annotationSpanDatasetTag = annotationSpanDatasetTagRepository
                .findByAnnotationSpanAndDatasetTag(annotationSpan, datasetTag)
                .orElseThrow(() -> new RuntimeException("Annotation Span DatasetTag not found"));

        annotationSpanDatasetTag.setRemoved(true);
        if(!annotationSpanDatasetTag.getRemovedBy().contains(username)) {
            annotationSpanDatasetTag.setRemovedBy(String.format("%s%s,", annotationSpanDatasetTag.getRemovedBy(), username));
        }
        return annotationSpanDatasetTagRepository.save(annotationSpanDatasetTag);
    }


}
