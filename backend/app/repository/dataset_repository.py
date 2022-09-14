from app import db
from app.models import Dataset

class DatasetRepository:
    def get_all(self):
        return Dataset.query.all()

    def get_by_id(self, id):
        return Dataset.query.get(id)

    def save(self, dataset):
        db.session.add(dataset)
        db.session.commit()

        return dataset

    def edit(self, id, title, link, description):
        dataset = self.get_by_id(id)
        dataset.title = title
        dataset.link = link
        dataset.description = description
        db.session.commit()

        return dataset

    def delete(self, dataset):
        db.session.delete(dataset)
        db.session.commit()

        return dataset