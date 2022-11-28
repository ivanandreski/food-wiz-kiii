package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.dto.out.AnnotationSpanDatasetTagSpacyDto;
import mk.ukim.finki.foodwizbackend.domain.dto.out.DocumentResponseDto;
import mk.ukim.finki.foodwizbackend.domain.dto.out.DocumentTagsDto;
import mk.ukim.finki.foodwizbackend.domain.enumeration.Status;
import mk.ukim.finki.foodwizbackend.domain.exceptions.DocumentNotFoundException;
import mk.ukim.finki.foodwizbackend.domain.models.AnnotationSpanDatasetTag;
import mk.ukim.finki.foodwizbackend.domain.models.Document;
import mk.ukim.finki.foodwizbackend.repository.AnnotationSpanDatasetTagRepository;
import mk.ukim.finki.foodwizbackend.repository.DocumentRepository;
import mk.ukim.finki.foodwizbackend.service.DocumentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final AnnotationSpanDatasetTagRepository annotationSpanDatasetTagRepository;

    @Value("${flask.url}")
//    @Value("${spring.datasource.url}")
    private String flaskUrl;

    public DocumentServiceImpl(DocumentRepository documentRepository, AnnotationSpanDatasetTagRepository annotationSpanDatasetTagRepository) {
        this.documentRepository = documentRepository;
        this.annotationSpanDatasetTagRepository = annotationSpanDatasetTagRepository;
    }

    @Override
    public DocumentResponseDto get(Long id, String datasets, String sources) {
        DocumentResponseDto responseDto = new DocumentResponseDto();

        Document document = documentRepository.findById(id).orElseThrow(() -> new DocumentNotFoundException(id));
        List<AnnotationSpanDatasetTag> tagsOriginal = annotationSpanDatasetTagRepository.getByDocumentAndDatasetAndSource(id);
        List<AnnotationSpanDatasetTagSpacyDto> tagsForConversion = tagsOriginal.stream()
                .map(AnnotationSpanDatasetTagSpacyDto::new)
                .toList();
        DocumentTagsDto requestBody = new DocumentTagsDto(document.getText(), tagsForConversion);
        try {
            System.out.println(this.flaskUrl);
            URL url = new URL(this.flaskUrl + "/convert-annotation-spans");
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("Accept", "application/json");
            con.setDoOutput(true);

            try(OutputStream os = con.getOutputStream()) {
                byte[] input = requestBody.toJSON().getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
//                System.out.println(response.toString());
                responseDto.setDocument(document);
                responseDto.setTokens(response.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return responseDto;
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
