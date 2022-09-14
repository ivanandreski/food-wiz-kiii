from app import db
from app.models import Dataset
from app.repository.dataset_repository import DatasetRepository

class DatasetService:
    def __init__(self, dataset_repository: DatasetRepository):
        self.dataset_repository = dataset_repository

    def get_all(self):
        return self.dataset_repository.get_all()

    def get_by_id(self, id):
        return self.dataset_repository.get_by_id(id)

    def save(self, id, title, link, description):
        dataset = Dataset(id=id, title=title, link=link, description=description)
        
        return self.dataset_repository.save(dataset)

    def edit(self, id, title, link, description):
        return self.dataset_repository.edit(id, title, link, description)

    def delete(self, id):
        dataset = self.get_by_id(id)
        
        return self.dataset_repository.delete(dataset)