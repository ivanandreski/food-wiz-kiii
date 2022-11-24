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

            String corpusTitle = file.getOriginalFilename().replace(".json", "");
            if (corpusRepository.existsByTitle(corpusTitle))
                return new ResponseEntity<>(String.format("Corpus with filename: %s already exists", corpusTitle), HttpStatus.INTERNAL_SERVER_ERROR);

            Corpus corpus = corpusRepository.save(new Corpus(corpusTitle));

            List<Dataset> datasets = datasetRepository.findAll();
            List<DatasetTag> datasetTags = datasetTagRepository.findAll();

            // for doc in obj:
            while (iterator.hasNext()) {
                JSONObject object = (JSONObject) iterator.next();

                String documentText = object.getString("abstract");
                String documentId = Integer.toString(object.getInt("pubmed_id"));
                String metadata = object.toString();
                Document document = new Document(documentText, documentId, metadata, corpus, Status.NEW);
                documentRepository.save(document);
//                corpus.getDocuments().add(document);

                Iterator<String> keys = object.keys();
                // for el in doc:
                while (keys.hasNext()) {
                    String key = keys.next();
                    try {
                        String isString = object.getString(key);
                        continue;
                    } catch (JSONException ignored) {}
                    Object value = object.get(key);
                    // if type(doc[el]) == list:
                    if (value.toString().startsWith("[") && !value.toString().equals("[]")) {
                        JSONArray array;
                        try {
                            array = new JSONArray(value.toString());
                        } catch (JSONException e) {
                            return new ResponseEntity<>(value.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                        Iterator<Object> arrayIterator = array.iterator();
                        // for i in doc
                        while (arrayIterator.hasNext()) {
                            Object iterValue = arrayIterator.next();
//                            if(iterValue.toString().equals("None")) {
//                                continue;
//                            }
                            JSONObject i;
                            try {
                                i = new JSONObject(iterValue.toString());
                            } catch (JSONException e) {
                                return new ResponseEntity<>(iterValue.toString() + array.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
                            }
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
                                        .filter(dataset -> dataset.getTitle().toLowerCase().contains(iKey.toLowerCase()))
                                        .toList()
                                        .size() > 0;
                                if (flag) {
                                    if(corpusDatasets.stream().filter(c -> c.getDataset().getTitle().toLowerCase().contains(iKey.toLowerCase())).toList().size() == 0)
                                        corpusDatasets.add(new CorpusDataset(corpus, datasets.stream().filter(dataset -> dataset.getTitle().toLowerCase().contains(iKey.toLowerCase())).findFirst().get()));
                                    String[] tagIds;
                                    try {
                                        tagIds = i.getString(iKey).split("\\*\\*\\*");
                                    } catch (JSONException e) {
                                        continue;
                                    }

                                    // for t in tag_ids:
                                    for (String tagId : tagIds) {
                                        String datasetTagId;
                                        if (tagId.contains("http")) {
                                            String[] split = tagId.split("/");
                                            datasetTagId = split[split.length - 1];
                                        } else {
                                            datasetTagId = tagId;
                                        }
                                        Optional<DatasetTag> tag = datasetTags.stream()
                                                .filter(t -> t.getTagId().equals(datasetTagId))
                                                .findFirst();
                                        if (tag.isPresent()) {
                                            AnnotationSpanDatasetTag annotationSpanDatasetTag = new AnnotationSpanDatasetTag(
                                                    tag.get(),
                                                    annotationSpan,
                                                    tag.get().getTagName(),
                                                    key
                                            );
                                            annotationSpanDatasetTags.add(annotationSpanDatasetTag);
                                        }
                                    }
                                }
                            }
                        }
                    }

//                    documentRepository.save(document);
                }
//                corpusRepository.save(corpus);
                annotationSpanRepository.saveAll(document.getAnnotationSpans());
                System.out.println("Document " + documentId + " done");
            }
            corpusDatasetRepository.saveAll(corpusDatasets);
            annotationSpanDatasetTagRepository.saveAll(annotationSpanDatasetTags);
        } catch (JSONException err) {
            return new ResponseEntity<>(err.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>("Corpus file with all relatonships successfully imported", HttpStatus.OK);

    }

    @Override
    public ResponseEntity<String> importDataset(MultipartFile[] files) {
        StringBuilder message = new StringBuilder();
        message.append("Successfully imported:\n");
        for (MultipartFile file : Arrays.stream(files).toList()) {
            if(datasetRepository.existsByTitle(file.getOriginalFilename())) {
                message.append(String.format("Dataset with filename %s already exists.", file.getOriginalFilename()));
                continue;
            }
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
                return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            try {
                JSONObject parsedJson = new JSONObject(result.toString());

                String datasetTitle = file.getOriginalFilename().replace(".json", "");
                if (datasetRepository.existsByTitle(datasetTitle))
                    continue;
                Dataset dataset = datasetRepository.save(new Dataset(datasetTitle));

                Iterator<String> iterator = parsedJson.keys();
                int counter = 0;
                List<DatasetTag> tags = new ArrayList<>();
                while (iterator.hasNext()) {
                    String key = iterator.next();
                    String tagName = parsedJson.getString(key);
                    if (tags.stream().filter(t -> t.getTagId().equals(key)).toList().size() == 0)
                        tags.add(new DatasetTag(key, tagName, dataset));
                    counter++;
                }

                message.append(String.format("Dataset: %s with %d dataset tags\n", datasetTitle, counter));

                datasetTagRepository.saveAll(tags);
            } catch (JSONException err) {
                return new ResponseEntity<>(err.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(message.toString(), HttpStatus.OK);
    }
}
