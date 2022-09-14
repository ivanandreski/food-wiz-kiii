from app import db
from app.models import DatasetTag
from app.repository.dataset_tag_repository import DatasetTagRepository
from app.service.utilities import Utilities

class DatasetTagService:
    def __init__(self, dataset_tag_repository: DatasetTagRepository):
        self.dataset_tag_repository = dataset_tag_repository

    def get_all(self):
        return self.dataset_tag_repository.get_all()

    def get_all_by_dataset_filter(self, datasetFilter):
        if len(datasetFilter) > 0 and datasetFilter[-1]==',':
            datasetFilter=datasetFilter[:-1]
        datasets = datasetFilter.split(",");
        result = {}
        for d in datasets:
            result[d] = Utilities.serialize_list(self.dataset_tag_repository.get_by_dataset_id(d))

        return result

    def get_by_id(self, id):
        return self.dataset_tag_repository.get_by_id(id)

    def save(self, id, tag_name, link, description, dataset_id):
        dataset_tag = DatasetTag(id=id, tag_name=tag_name, link=link, description=description, dataset_id=dataset_id)
        
        return self.dataset_tag_repository.save(dataset_tag)

    def edit(self, id, tag_name, link, description, dataset_id):
        return self.dataset_tag_repository.edit(id, tag_name, link, description, dataset_id)

    def delete(self, id):
        dataset_tag = DatasetTag.query.get(id)
        
        return self.dataset_tag_repository.delete(dataset_tag)

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        self.dataset_tag_repository.bulk_insert(objects)