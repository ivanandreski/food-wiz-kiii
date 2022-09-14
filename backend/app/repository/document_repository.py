from app import db
from app.models import Document, Status

class DocumentRepository:
    def get_all(self):
        return Document.query.all()

    def get_paginated(self, page_number):
        return Document.query.paginate(int(page_number), 12, False)

    def get_by_id(self, id):
        return Document.query.get(id)

    def save(self, document):
        db.session.add(document)
        db.session.commit()

        return document

    def edit(self, id, text, status, corpus_id):
        document = self.get_by_id(id)
        document.text = text
        document.corpus_id = corpus_id
        document.status = Status[status]
        db.session.commit()

        return document

    def delete(self, id):
        document = Document.query.get(id)
        db.session.delete(Document)
        db.session.commit()

        return document

    def delete_with(self, corpus_id):
        Document.query \
            .filter(Document.corpus_id == corpus_id) \
            .delete()

    def get_all_from_corpus_paged(self, corpus_id, per_page, page_number):
        return Document.query \
            .filter(Document.corpus_id == corpus_id) \
            .order_by(Document.id) \
            .paginate(page=int(page_number), per_page=int(per_page))

    def get_all_from_corpus(self, corpus_id):
        return Document.query \
            .filter(Document.corpus_id == corpus_id)

    def set_status(self, document, status):
        document.status = status
        db.session.commit()

        return document

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        db.session.bulk_save_objects(objects)
        db.session.commit()