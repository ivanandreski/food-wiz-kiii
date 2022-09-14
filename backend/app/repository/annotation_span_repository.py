from app import db
from app.models import AnnotationSpan, Status

class AnnotationSpanRepository:
    def get_all(self):
        return AnnotationSpan.query.all()

    def get_by_id(self, id):
        return AnnotationSpan.query.get(id)

    def save(self, annotation_span):
        db.session.add(annotation_span)
        db.session.commit()

        return annotation_span

    def delete(self, annnotation_span):
        db.session.delete(annnotation_span)
        db.session.commit()

        return annnotation_span

    def delete_with(self, document_id):
        AnnotationSpan.query \
            .filter(AnnotationSpan.document_id == document_id) \
            .delete()
        db.session.commit()

    def get_all_from_document(self, document_id):
        result = AnnotationSpan.query \
            .filter(AnnotationSpan.document_id == document_id) \
            .all()

        return result

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        db.session.bulk_save_objects(objects)
        db.session.commit()
