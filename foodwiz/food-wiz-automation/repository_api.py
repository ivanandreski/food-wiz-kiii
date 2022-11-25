from typing import List

from models import AnnotationSpanDatasetTag
from utilities import Utilities


class TokenTag:

    def __init__(self, token: str, link: str, dataset: str, removed: bool, removedBy: str, source: str):
        self.token = token
        self.link = link
        self.dataset = dataset
        self.removed = removed
        self.removedBy = removedBy
        self.source = source

    @property
    def serialized(self):
        return {
            'link': self.link,
            'token': self.token,
            'dataset': self.dataset,
            'removed': self.removed,
            'removedBy': self.removedBy,
            'source': self.source
        }


class TokenWithStart:
    text: str
    start: int
    tags: List[TokenTag]
    annotationSpanId: str

    def __init__(self, text: str, start: int):
        self.text = text
        self.start = start
        self.tags = []
        self.annotationSpanId = None

    @property
    def serialized(self):
        return {
            'text': self.text,
            'tags': Utilities.serialize_list(self.tags),
            'start': self.start,
            'end': self.start + len(self.text.strip()),
            # 'annotationSpanId': self.annotationSpanId
        }


class TokenizerRepository:

    def tokenize(self, text: str) -> List[TokenWithStart]:
        pass


class NerTagRepository:

    def annotation_spans_to_ner_array(self, text: str, spans: List[AnnotationSpanDatasetTag]) -> List[TokenWithStart]:
        pass
