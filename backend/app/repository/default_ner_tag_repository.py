from typing import List

from app.models import AnnotationSpanDatasetTag
from app.repository.respository_api import NerTagRepository, TokenizerRepository, TokenTag


class DefaultNerTagRepository(NerTagRepository):

    def __init__(self, tokenizer_repository: TokenizerRepository):
        self.tokenizer_repository = tokenizer_repository

    def annotation_spans_to_ner_array(self, text: str, spans: List[AnnotationSpanDatasetTag]):
        tokens = self.tokenizer_repository.tokenize(text)

        for ann in spans:
            for t in tokens:
                if t.start >= ann.annotation_span.start_char and t.start + len(t.text.strip()) <= ann.annotation_span.end_char:
                    if t.annotationSpanId == None:
                        t.annotationSpanId = ann.annotation_span_id
                    
                    t.tags.append(TokenTag(ann.dataset_tag.tag_name, ann.dataset_tag.id, ann.dataset_tag.dataset_id, ann.removed, ann.removedBy, ann.source))
        return tokens
