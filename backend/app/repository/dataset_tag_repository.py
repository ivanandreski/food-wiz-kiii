from app import db
from app.models import DatasetTag

class DatasetTagRepository:
    def get_all(self):
        return DatasetTag.query.all()

    def get_by_dataset_id(self, dataset_id):
        return DatasetTag.query.filter(DatasetTag.dataset_id == dataset_id).all()

    def get_by_id(self, id):
        return DatasetTag.query.get(id)

    def save(self, dataset_tag):
        db.session.add(dataset_tag)
        db.session.commit()

        return dataset_tag

    def edit(self, id, tag_name, link, description, dataset_id):
        dataset_tag = self.get_by_id(id)
        dataset_tag.tag_name = tag_name
        dataset_tag.link = link
        dataset_tag.description = description
        dataset_tag.dataset_id = dataset_id
        db.session.commit()

        return dataset_tag

    def delete(self, dataset_tag):
        db.session.delete(dataset_tag)
        db.session.commit()

        return dataset_tag

    # ONLY USED FOR IMPORTING
    def bulk_insert(self, objects):
        db.session.bulk_save_objects(objects)
        db.session.commit()