package mk.ukim.finki.foodwizbackend.service.impl;

import mk.ukim.finki.foodwizbackend.domain.dto.out.ImportResponseDto;
import mk.ukim.finki.foodwizbackend.domain.enumeration.Status;
import mk.ukim.finki.foodwizbackend.domain.models.*;
import mk.ukim.finki.foodwizbackend.repository.*;
import mk.ukim.finki.foodwizbackend.service.ImportService;
import org.aspectj.bridge.IMessage;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.*;

@Service
public class ImportServiceImpl implements ImportService {

    private final CorpusRepository corpusRepository;
    private final CorpusDatasetRepository corpusDatasetRepository;
    private final DocumentRepository documentRepository;
    private final DatasetRepository datasetRepository;
    private final DatasetTagRepository datasetTagRepository;
    private final AnnotationSpanRepository annotationSpanRepository;
    private final AnnotationSpanDatasetTagRepository annotationSpanDatasetTagRepository;

    public ImportServiceImpl(CorpusRepository corpusRepository, CorpusDatasetRepository corpusDatasetRepository, DocumentRepository documentRepository, DatasetRepository datasetRepository, DatasetTagRepository datasetTagRepository, AnnotationSpanRepository annotationSpanRepository, AnnotationSpanDatasetTagRepository annotationSpanDatasetTagRepository) {
        this.corpusRepository = corpusRepository;
        this.corpusDatasetRepository = corpusDatasetRepository;
        this.documentRepository = documentRepository;
        this.datasetRepository = datasetRepository;
        this.datasetTagRepository = datasetTagRepository;
        this.annotationSpanRepository = annotationSpanRepository;
        this.annotationSpanDatasetTagRepository = annotationSpanDatasetTagRepository;
    }

    @Override
    public ResponseEntity<String> importCorpus(MultipartFile file) {
        if (datasetRepository.count() == 0)
            return new ResponseEntity<>("Import datasets first!", HttpStatus.INTERNAL_SERVER_ERROR);

        BufferedReader br;
        StringBuilder result = new StringBuilder();
        try {
            String line;
            InputStream is = file.getInputStream();
            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                result.append(line);
            }

        } catch (IOException e) {
            System.err.println(e.getMessage());
        }

        try {
            JSONArray parsedJson = new JSONArray(result.toString());
            Iterator<Object> iterator = parsedJson.iterator();

            List<CorpusDataset> corpusDatasets = new ArrayList<>();
            List<AnnotationSpanDatasetTag> annotationSpanDatasetTags = new ArrayList<>();

            while (iterator.hasNext()) {
                JSONObject object = (JSONObject) iterator.next();

                //if (len(dataset_service.get_all()) == 0)

//                json_data = file.read()
//                obj = json.loads(json_data)

//                corpus_title = file.filename.split(".json")[0]
//                if (corpus_service.get_by_title(corpus_title)):
//                return f 'Corpus with filename: {corpus_title} already exists', 500
                String corpusTitle = file.getName();
                if (corpusRepository.existsByTitle(corpusTitle))
                    return new ResponseEntity<>(String.format("Corpus with filename: %s already exists", corpusTitle), HttpStatus.INTERNAL_SERVER_ERROR);

//                corpus = corpus_service.save(title = corpus_title, link = "", description = "")
//                corpus_id = corpus.id
                Corpus corpus = corpusRepository.save(new Corpus(corpusTitle));

//                datasets = Dataset.query.all()
                List<Dataset> datasets = datasetRepository.findAll();

//                documents = {}
//                annotation_spans = {}
//                corpus_datasets = {}
//                annotation_span_dataset_tags = {}

                //document_metadata = json.dumps(doc)
                //document_id = int(doc["pubmed_id"])
                //documents[document_id] = Document(text = document_text, id = document_id, meta_data = document_metadata, corpus_id = corpus_id, status = Status['NEW'])
                String documentText = (String) object.get("abstract");
                String documentId = (String) object.get("pubmed_id");
                String metadata = object.toString();
                Document document = new Document(documentText, documentId, metadata, corpus, Status.NEW);
                documentRepository.save(document);
                corpus.getDocuments().add(document);

                Iterator<String> keys = object.keys();
                while (keys.hasNext()) {
                    String key = keys.next();
                    Object value = object.get(key);
                    if (value.toString().startsWith("[")) {
                        JSONArray array = new JSONArray(value);
                        Iterator<Object> arrayIterator = array.iterator();
                        while (arrayIterator.hasNext()) {
                            JSONObject i = (JSONObject) arrayIterator.next();
                            Integer startChar;
                            Integer endChar;
                            try {
                                startChar = i.getInt("start_char");
                                endChar = i.getInt("end_char");
                            } catch (JSONException e) {
                                continue;
                            }
                            String text = i.getString("text");
                            AnnotationSpan annotationSpan = new AnnotationSpan(startChar, endChar, text, document);
                            document.getAnnotationSpans().add(annotationSpan);
                            document.setStatus(Status.ANNOTATED);
                            for (String iKey : i.keySet()) {
                                boolean flag = datasets.stream()
                                        .map(Dataset::getTitle)
                                        .toList()
                                        .contains(iKey);
                                if (flag) {
                                    corpusDatasets.add(new CorpusDataset(corpus, datasets.stream().filter(dataset -> dataset.getTitle().equals(iKey)).findFirst().get()));
                                    String[] tagIds = i.getString(iKey).split("\\*\\*\\*");
                                    for (String tagId : tagIds) {
                                        String datasetTagId = null;
                                        if (tagId.contains("http")) {
                                            String[] split = tagId.split("/");
                                            datasetTagId = split[split.length - 1];
                                        } else {
                                            datasetTagId = tagId;
                                        }
                                        DatasetTag tag = datasetTagRepository.findByTagId(datasetTagId);
                                        if (tag != null) {
                                            AnnotationSpanDatasetTag annotationSpanDatasetTag = new AnnotationSpanDatasetTag(
                                                    tag,
                                                    annotationSpan,
                                                    tag.getTagName(),
                                                    key
                                            );
                                            annotationSpanDatasetTags.add(annotationSpanDatasetTag);
                                        }
                                    }
                                }
                            }

                            documentRepository.save(document);
                        }
                    }
                }
                corpusRepository.save(corpus);
                corpusDatasetRepository.saveAll(corpusDatasets);
                annotationSpanDatasetTagRepository.saveAll(annotationSpanDatasetTags);
            }
        } catch (JSONException err) {
            return new ResponseEntity<>(err.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return null;

    }

    @Override
    public ResponseEntity<String> importDataset(MultipartFile[] files) {
        StringBuilder message = new StringBuilder();
        message.append("Successfully imported:\n");
//        List<DatasetTag> datasetTags = new ArrayList<>();
        for (MultipartFile file : files) {
            BufferedReader br;
            StringBuilder result = new StringBuilder();
            try {
                String line;
                InputStream is = file.getInputStream();
                br = new BufferedReader(new InputStreamReader(is));
                while ((line = br.readLine()) != null) {
                    result.append(line);
                }

            } catch (IOException e) {
                System.err.println(e.getMessage());
            }

            try {
                JSONObject parsedJson = new JSONObject(result.toString());

                String datasetTitle = file.getOriginalFilename();
                Dataset dataset = datasetRepository.save(new Dataset(datasetTitle));

                Iterator<String> iterator = parsedJson.keys();
                int counter = 0;
                List<DatasetTag> tags = new ArrayList<>();
                while (iterator.hasNext()) {
                    String key = iterator.next();
                    String tagName = parsedJson.getString(key);
                    tags.add(new DatasetTag(key, tagName, dataset));
                    counter++;
                }

                message.append(String.format("Dataset: %s with %d dataset tags\n", datasetTitle, counter));

                datasetRepository.save(dataset);
                datasetTagRepository.saveAll(tags);
                return new ResponseEntity<>(message.toString(), HttpStatus.OK);
            } catch (JSONException err) {
                return new ResponseEntity<>(err.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>("Something went wrong!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
