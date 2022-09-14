from app import db
from app.models import Document, Status
from app.service import annotation_span_service
from app.repository.document_repository import DocumentRepository
from app.repository.annotation_span_repository import AnnotationSpanRepository

class DocumentService:
    def __init__(self, document_repository: DocumentRepository, annotation_span_repository: AnnotationSpanRepository):
        self.document_repository = document_repository
        self.annotation_span_repository = annotation_span_repository

    def get_all(self):
        return self.document_repository.get_all()

    def get_paginated(self, page_number):
        return self.document_repository.get_paginated(page_number=page_number)

    def get_by_id(self, id):
        return self.document_repository.get_by_id(id=id)

    def save(self, id, text, meta_data, corpus_id):
        document = Document(id=id, text=text, meta_data=meta_data, status=Status['NEW'], corpus_id=corpus_id)
        
        return self.document_repository.save(document)

    def edit(self, id, text, status, corpus_id):
        return self.document_repository.edit(id=id, text=text, status=status, corpus_id=corpus_id)

    def delete(self, id):
        document = self.get_by_id(id=id)

        return self.document_repository.delete(document)

    def delete_all_with(self,corpus_id):
        documents = self.document_repository.get_all_from_corpus(corpus_id)
        for d in documents:
            self.annotation_span_repository.delete_with(d.id)
        self.document_repository.delete_multiple(documents)

    def get_all_from_corpus(self, corpus_id, per_page, page_number):
        return self.document_repository.get_all_from_corpus_paged(corpus_id=corpus_id, per_page=per_page, page_number=page_number)

    def validate(self, id):
        document = self.get_by_id(id)
        status = None
        if document.status == Status['VALIDATED']:
            if self.is_document_annotated(id):
                status = Status['ANNOTATED']
            else:
                status = Status['NEW']
        else:
            status = Status['VALIDATED']

        return self.document_repository.set_status(document=document, status=status)

    def is_document_annotated(self, id):
        return len(self.annotation_span_repository.get_all_from_document(id)) > 0

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        self.document_repository.bulk_insert(objects)
