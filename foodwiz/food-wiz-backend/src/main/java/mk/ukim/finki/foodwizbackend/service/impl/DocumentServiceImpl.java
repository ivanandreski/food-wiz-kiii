package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.enumeration.Status;
import mk.ukim.finki.foodwizbackend.domain.models.Document;
import mk.ukim.finki.foodwizbackend.repository.DocumentRepository;
import mk.ukim.finki.foodwizbackend.service.DocumentService;
import org.springframework.stereotype.Service;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Override
    public Document get(Long id) {
        return null;
    }

    @Override
    public Document validate(Long id) {
        Document document = documentRepository.findById(id).orElseThrow();
        Status status = null;
        if (document.getStatus() == Status.VALIDATED) {
            if(document.getAnnotationSpans().size() > 0)
                status = Status.ANNOTATED;
            else
                status = Status.NEW;
        }
        else{
            status = Status.VALIDATED;
        }
        document.setStatus(status);
        documentRepository.save(document);
        return document;
    }
}
