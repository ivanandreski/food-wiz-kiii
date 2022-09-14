from pkgutil import ImpImporter
from app.models import Corpus
from app.repository.corpus_repository import CorpusRepository
from app.repository.corpus_dataset_repository import CorpusDatasetRepository
from app.repository.annotation_span_dataset_tag_repository import AnnotationSpanDatasetTagRepository
from app.repository.annotation_span_repository import AnnotationSpanRepository
from app.repository.document_repository import DocumentRepository

class CorpusService:
    def __init__(self, corpus_repository: CorpusRepository, document_repository: DocumentRepository, annotiaton_span_repository: AnnotationSpanRepository, annotation_span_dataset_tag_repository: AnnotationSpanDatasetTagRepository, corpus_dataset_repository: CorpusDatasetRepository):
        self.corpus_repository = corpus_repository
        self.document_repository = document_repository
        self.annotiaton_span_repository = annotiaton_span_repository
        self.annotation_span_dataset_tag_repository = annotation_span_dataset_tag_repository
        self.corpus_dataset_repository = corpus_dataset_repository

    def get_all(self):
        return self.corpus_repository.get_all()

    def get_paginated(self, page_number):
        return self.corpus_repository.get_paginated(page_number)

    def get_by_id(self, id):
        return self.corpus_repository.get_by_id(id)

    def get_by_title(self, title):
        return self.corpus_repository.get_by_title(title)

    def save(self, title, link, description):
        corpus = Corpus(title=title, link=link, description=description)

        return self.corpus_repository.save(corpus)

    def edit(self, id, title, link, description):
        return self.corpus_repository.edit(id, title, link, description)

    def delete(self, id):
        corpus = self.get_by_id(id)
        self.corpus_dataset_repository.delete_all_with(id)
        documents = self.document_repository.get_all_from_corpus(id)
        for d in documents:
            annotation_spans = self.annotiaton_span_repository.get_all_from_document(d.id)
            for a in annotation_spans:
                self.annotation_span_dataset_tag_repository.delete_with(a.id)
            self.annotiaton_span_repository.delete_with(d.id)
        self.document_repository.delete_with(id)

        return self.corpus_repository.delete(corpus)