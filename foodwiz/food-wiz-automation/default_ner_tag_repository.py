from typing import List

from models import AnnotationSpanDatasetTag
from repository_api import NerTagRepository, TokenizerRepository, TokenTag


class DefaultNerTagRepository(NerTagRepository):

    def __init__(self, tokenizer_repository: TokenizerRepository):
        self.tokenizer_repository = tokenizer_repository

    def annotation_spans_to_ner_array(self, text: str, spans: List[AnnotationSpanDatasetTag]):
        tokens = self.tokenizer_repository.tokenize(text)

        for ann in spans:
            for t in tokens:
                if t.start >= int(ann.start_char) and t.start + len(t.text.strip()) <= int(ann.end_char):
                    # if t.annotationSpanId == None:
                    #     t.annotationSpanId = ann.annotation_span_id
                    
                    t.tags.append(TokenTag(ann.tag, ann.dataset_tag_id, ann.dataset_title, ann.removed, ann.removedBy, ann.source))
        return tokens
