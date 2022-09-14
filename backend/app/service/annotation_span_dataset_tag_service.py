from typing import List

from app import db
from app.models import AnnotationSpanDatasetTag, AnnotationSpan
from app.repository.annotation_span_dataset_tag_repository import AnnotationSpanDatasetTagRepository
from app.repository.annotation_span_repository import AnnotationSpanRepository
from app.repository.dataset_tag_repository import DatasetTagRepository

class AnnotationSpanDatasetTagService:
    def __init__(self, annotation_span_dataset_tag_repository: AnnotationSpanDatasetTagRepository, annotation_span_repository: AnnotationSpanRepository, dataset_tag_repository: DatasetTagRepository):
        self.annotation_span_dataset_tag_repository = annotation_span_dataset_tag_repository
        self.annotation_span_repository = annotation_span_repository
        self.dataset_tag_repository = dataset_tag_repository

    def get_all(self):
        return self.annotation_span_dataset_tag_repository.get_all()

    def get_by_id(self, a_id, d_id):
        return self.annotation_span_dataset_tag_repository(a_id, d_id)

    def get_all_sources(self):
        return self.annotation_span_dataset_tag_repository.get_all_sources()

    def create_new(self, start, text, tagId, document_id, current_user):
        end = int(start) + len(text)
        annotation_span_id = start + str(end) + str(document_id)

        annotation_span_dataset_tag = self.annotation_span_dataset_tag_repository.get_by_id(a_id=annotation_span_id, d_id=tagId)
        if(annotation_span_dataset_tag != None):
            annotation_span_dataset_tag.removed = False
            db.session.commit()
            return annotation_span_dataset_tag

        annotation_span = self.annotation_span_repository.get_by_id(annotation_span_id)
        if(annotation_span == None):
            annotation_span = AnnotationSpan(id=annotation_span_id, start_char=int(start), end_char=end, text=text, document_id=int(document_id))
            self.annotation_span_repository.save(annotation_span)

        dataset_tag = self.dataset_tag_repository.get_by_id(tagId)

        return self.save(annotation_span.id, dataset_tag.id, dataset_tag.tag_name, current_user.full_name)

    def save(self, annotation_span_id, dataset_tag_id, tag, current_user):
        obj = AnnotationSpanDatasetTag(dataset_tag_id=dataset_tag_id, annotation_span_id=annotation_span_id, tag=tag, removed=False, removedBy="", source=current_user)

        return self.annotation_span_dataset_tag_repository.save(obj)

    def mark_delete(self, a_id, d_id, current_user):
        obj = AnnotationSpanDatasetTag.query.get((a_id, d_id))
        obj.removed = True
        if(obj.removedBy == None):
            obj.removedBy = ""
        full_name = "currentUser"
        if(current_user is not None):
            full_name = current_user.full_name
        if(full_name not in obj.removedBy):
            obj.removedBy = obj.removedBy + f"{full_name},"
        db.session.commit()
        
        return obj

    def delete(self, a_id, d_id):
        obj = AnnotationSpanDatasetTag.query.get((a_id, d_id))
        
        return self.annotation_span_dataset_tag_repository.delete(obj)

    def delete_with(self, annotation_span_id):
        self.annotation_span_dataset_tag_repository.delete_with(annotation_span_id)

    def find_by_document_and_dataset(self, document_id, dataset_id):
        return self.annotation_span_dataset_tag_repository.find_by_document_and_dataset(document_id, dataset_id)

    def find_by_document(self, document_id, datasetFilter, sourceFilter) -> List[AnnotationSpanDatasetTag]:
        return self.annotation_span_dataset_tag_repository.find_by_document(document_id, datasetFilter, sourceFilter)

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        self.annotation_span_dataset_tag_repository.bulk_insert(objects)
        db.session.commit()