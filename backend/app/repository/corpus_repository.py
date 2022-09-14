from pkgutil import ImpImporter
from app import db
from app.models import Corpus

class CorpusRepository:
    def get_all(self):
        return Corpus.query.all()

    def get_paginated(self, page_number):
        return Corpus.query.paginate(int(page_number), 12, False)

    def get_by_id(self, id):
        return Corpus.query.get(id)

    def get_by_title(self, title):
        return Corpus.query.filter(Corpus.title == title).first()

    def save(self, corpus):
        db.session.add(corpus)
        db.session.commit()

        return corpus

    def edit(self, id, title, link, description):
        corpus = self.get_by_id(id)
        corpus.title = title
        corpus.link = link
        corpus.description = description
        db.session.commit()

        return corpus

    def delete(self, corpus):
        db.session.delete(corpus)
        db.session.commit()

        return corpus