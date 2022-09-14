import enum

from app import db


class Status(enum.Enum):
    NEW = 'new'
    ANNOTATED = 'annotated'
    VALIDATED = 'validated'


class CorpusDataset(db.Model):
    corpus_id = db.Column(db.Integer, db.ForeignKey('corpus.id', ondelete='CASCADE'), primary_key=True)
    dataset_id = db.Column(db.String(), db.ForeignKey('dataset.id', ondelete='CASCADE'), primary_key=True)


class AnnotationSpan(db.Model):
    id = db.Column(db.String(), primary_key=True)
    start_char = db.Column(db.Integer)
    end_char = db.Column(db.Integer)
    text = db.Column(db.String())
    document_id = db.Column(db.Integer, db.ForeignKey('document.id', ondelete='CASCADE'))

    @property
    def serialized(self):
        return {
            'id': self.id,
            'start_char': self.start_char,
            'end_char': self.end_char,
            'text': self.text
        }


class Corpus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    link = db.Column(db.String())
    description = db.Column(db.String())

    @property
    def serialized(self):
        return {
            'id': self.id,
            'title': self.title,
            'link': self.link,
            'description': self.description
        }


class Dataset(db.Model):
    id = db.Column(db.String(), primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    link = db.Column(db.String())

    @property
    def serialized(self):
        return {
            'id': self.id,
            'title': self.title,
            'link': self.link,
            'description': self.description
        }


class DatasetTag(db.Model):
    id = db.Column(db.String(), primary_key=True)
    tag_name = db.Column(db.String())
    link = db.Column(db.String())
    description = db.Column(db.String())
    dataset_id = db.Column(db.String(), db.ForeignKey('dataset.id', ondelete='CASCADE'))

    @property
    def serialized(self):
        return {
            'id': self.id,
            'tag_name': self.tag_name,
            'link': self.link,
            'description': self.description,
            'dataset_id': self.dataset_id
        }


class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    text = db.Column(db.String())
    meta_data = db.Column(db.String())
    status = db.Column(db.Enum(Status))
    corpus_id = db.Column(db.Integer, db.ForeignKey('corpus.id', ondelete='CASCADE'))

    def getStatus(self):
        if self.status == None:
            return None
        return self.status.value

    @property
    def serialized(self):
        return {
            'id': self.id,
            'text': self.text,
            'status': self.getStatus()
        }


class AnnotationSpanDatasetTag(db.Model):
    annotation_span_id = db.Column(db.String(), db.ForeignKey('annotation_span.id', ondelete='CASCADE'), primary_key=True)
    dataset_tag_id = db.Column(db.String(), db.ForeignKey('dataset_tag.id', ondelete='CASCADE'), primary_key=True)
    tag = db.Column(db.String())
    source = db.Column(db.String())
    removed = db.Column(db.Boolean)
    removedBy = db.Column(db.String())
    annotation_span: AnnotationSpan = db.relationship("AnnotationSpan")
    dataset_tag: DatasetTag = db.relationship("DatasetTag")

    @property
    def serialized(self):
        return {
            'id': self.annotation_span_id,
            'dataset_id': self.dataset_tag.dataset_id,
            'tag': self.dataset_tag.tag_name,
            'source': self.source,
            'removed': self.removed,
            'removedBy': self.removedBy,
            'start_char': self.annotation_span.start_char,
            'end_char': self.annotation_span.end_char,
            'text': self.annotation_span.text
        }

class User(db.Model):
    email = db.Column(db.String(), primary_key = True)
    full_name = db.Column(db.String())
    password = db.Column(db.Text())

    @property
    def serialized(self):
        return {
            'email': self.email,
            'full_name': self.full_name,
        }
