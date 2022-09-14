from app import db
from app.models import CorpusDataset

class CorpusDatasetRepository:
    def get_all(self):
        return CorpusDataset.query.all()

    def get_by_id(self, c_id, d_id):
        return CorpusDataset.query.get((c_id, d_id))

    def save(self, obj):
        db.session.add(obj)
        db.session.commit()

        return obj

    def delete(self, obj):
        db.session.delete(obj)
        db.session.commit()

        return obj

    def delete_all_with(self, corpus_id):
        CorpusDataset.query.filter(corpus_id == corpus_id).delete()
        db.session.commit()

    def find_all_corpus_datasets_by(self, corpus_id):
        return CorpusDataset.query.filter(corpus_id == corpus_id).all()

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        db.session.bulk_save_objects(objects)
        db.session.commit()