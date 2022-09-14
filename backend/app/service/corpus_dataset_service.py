from app.models import CorpusDataset
from app.repository.corpus_dataset_repository import CorpusDatasetRepository

class CorpusDatasetService:
    def __init__(self, corpus_dataset_repository: CorpusDatasetRepository):
        self.corpus_dataset_repository = corpus_dataset_repository

    def get_all(self):
        return self.corpus_dataset_repository.get_all()

    def get_by_id(self, c_id, d_id):
        return self.corpus_dataset_repository.get_by_id((c_id, d_id))

    def save(self, corpus_id, dataset_id):
        obj = CorpusDataset(corpus_id=corpus_id, dataset_id=dataset_id)

        return self.corpus_dataset_repository.save(obj)

    def delete(self, c_id, d_id):
        obj = self.get_by_id((c_id, d_id))

        return self.corpus_dataset_repository.delete(obj)

    def delete_all_with(self, corpus_id):
        self.corpus_dataset_repository.delete_all_with(corpus_id)

    def find_all_corpus_datasets_by(self, corpus_id):
        return self.corpus_dataset_repository.find_all_corpus_datasets_by(corpus_id)

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        self.corpus_dataset_repository.bulk_insert(objects)