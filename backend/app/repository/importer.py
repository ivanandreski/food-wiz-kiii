import json
from app.models import CorpusDataset, Dataset, AnnotationSpanDatasetTag,DatasetTag, Document, AnnotationSpan, Status

def import_dataset(files, dataset_service, dataset_tag_service):
    message = 'Successfully imported:\n'
    dataset_tags = set()
    for file in files:
        dataset_title = file.filename.split("-all")[0]
    
        json_data = file.read()
        obj = json.loads(json_data)

        dataset_service.save(id=dataset_title, title=dataset_title, link="", description="")

        counter = 0
        for i in obj:
            dataset_tags.add(DatasetTag(id=i, tag_name=obj[i], description="", link="", dataset_id=dataset_title))
            counter+=1

        message += 'Dataset: {0} with {1} dataset tags\n'.format(dataset_title, counter)

    dataset_tag_service.bulk_insert(dataset_tags)
    return message, 200

def import_corpus(file, corpus_service, document_service, dataset_service, dataset_tag_service, annotation_span_service, annotation_span_dataset_tag_service, corpus_dataset_service):
    if(len(dataset_service.get_all()) == 0):
        return 'Import datasets first!', 500

    json_data = file.read()
    obj = json.loads(json_data)
    
    corpus_title = file.filename.split(".json")[0]
    if(corpus_service.get_by_title(corpus_title)):
        return f'Corpus with filename: {corpus_title} already exists', 500

    corpus = corpus_service.save(title = corpus_title, link = "", description = "")
    corpus_id = corpus.id

    datasets = Dataset.query.all()

    documents = {}
    annotation_spans = {}
    corpus_datasets = {}
    annotation_span_dataset_tags = {}

    for doc in obj:
        document_text = doc["abstract"]
        document_metadata = json.dumps(doc)
        document_id = int(doc["pubmed_id"])
        documents[document_id] = Document(text = document_text, id = document_id, meta_data = document_metadata, corpus_id = corpus_id, status=Status['NEW'])
        for el in doc:
            if type(doc[el]) == list:
                # el is the name of teh source
                for i in doc[el]:
                    start_char = i["start_char"]
                    end_char = i["end_char"]
                    if start_char == None or end_char == None:
                        continue
                    text = i["text"]
                    aid = str(int(start_char)) + str(int(end_char)) + str(document_id)
                    annotation_spans[aid] = AnnotationSpan(id=aid, start_char=start_char, end_char=end_char, text=text, document_id=document_id)
                    documents[document_id].status = Status['ANNOTATED']
                    for dataset_title in i:
                        dataset_titles = [dataset.title for dataset in datasets]
                        if dataset_title in dataset_titles:
                            if i[dataset_title] != None:
                                corpus_datasets[str(corpus_id)+dataset_title] = CorpusDataset(corpus_id=corpus_id, dataset_id=dataset_title)
                                tag_ids = i[dataset_title].split("***")
                                for t in tag_ids:
                                    dataset_tag_id = None
                                    if ("http" in t):
                                        dataset_tag_id = t.split("/")[-1]
                                    else:
                                        dataset_tag_id = t
                                    dt = dataset_tag_service.get_by_id(dataset_tag_id)
                                    if (dt != None):
                                        annotation_span_dataset_tags[dataset_tag_id+aid] = AnnotationSpanDatasetTag(dataset_tag_id=dataset_tag_id, annotation_span_id=aid, tag=dt.tag_name, source=el, removed=False, removedBy="")
    
    document_service.bulk_insert(documents.values())
    annotation_span_service.bulk_insert(annotation_spans.values())
    corpus_dataset_service.bulk_insert(corpus_datasets.values())
    annotation_span_dataset_tag_service.bulk_insert(annotation_span_dataset_tags.values())

    return 'Corpus file with all relatonships successfully imported', 200
