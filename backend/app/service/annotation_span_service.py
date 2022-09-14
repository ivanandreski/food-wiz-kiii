from app import db
from app.models import AnnotationSpan, Status
from app.service import document_service, annotation_span_dataset_tag_service
from app.repository.annotation_span_repository import AnnotationSpanRepository
from app.repository.document_repository import DocumentRepository

class AnnnotationSpanService:
    def __init__(self, annotation_span_repository: AnnotationSpanRepository, document_repository: DocumentRepository):
        self.annotation_span_repository = annotation_span_repository
        self.document_repository = document_repository

    def get_all(self):
        return self.annotation_span_repository.get_all()

    def get_by_id(self, id):
        return self.annotation_span_repository.get_by_id(id)

    def save(self, start_char, end_char, text, document_id):
        document = self.document_repository.get_by_id(document_id)
        self.document_repository.set_status(document, Status['ANNOTATED'])
        id = str(int(start_char)) + str(int(end_char)) + str(document_id)
        annnotation_span = AnnotationSpan(id=id, start_char=start_char, end_char=end_char, text=text,
                                        document_id=document_id)
        
        return self.annotation_span_repository.save(annnotation_span)

    def delete(self, id):
        annnotation_span = self.get_by_id(id)

        return self.annotation_span_repository.delete(annnotation_span)

    def get_all_from_document(self, document_id):
        return self.annotation_span_repository.get_all_from_document(document_id)

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        self.annotation_span_repository.bulk_insert(objects)
