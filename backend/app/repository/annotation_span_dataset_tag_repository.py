from typing import List

from app import db
from app.models import AnnotationSpanDatasetTag, AnnotationSpan, DatasetTag

class AnnotationSpanDatasetTagRepository:
    def get_all(self):
        return AnnotationSpanDatasetTag.query.all()

    def get_by_id(self, a_id, d_id):
        return AnnotationSpanDatasetTag.query.get((a_id, d_id))

    def get_all_sources(self):
        return db.session.query(AnnotationSpanDatasetTag.source).distinct()

    def save(self, obj):
        db.session.add(obj)
        db.session.commit()

        return obj

    def delete(self, obj):
        db.session.delete(obj)
        db.session.commit()

        return obj

    def delete_with(self, annotation_span_id):
        AnnotationSpanDatasetTag.query.filter(AnnotationSpanDatasetTag.annotation_span_id == annotation_span_id).delete()

    def find_by_document_and_dataset(self, document_id, dataset_id):
        return AnnotationSpanDatasetTag.query.filter(
            AnnotationSpanDatasetTag.annotation_span.document_id == document_id,
            AnnotationSpanDatasetTag.dataset_tag.dataset_id == dataset_id).all()

    def find_by_document(self, document_id, datasetFilter, sourceFilter) -> List[AnnotationSpanDatasetTag]:
        res = AnnotationSpanDatasetTag.query \
            .join(AnnotationSpan) \
            .join(DatasetTag) \
            .filter(AnnotationSpan.document_id == document_id)

        temp = []
        for r in res:
            if(r.dataset_tag.dataset_id in datasetFilter and r.source in sourceFilter):
                temp.append(r)

        return temp

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        db.session.bulk_save_objects(objects)
