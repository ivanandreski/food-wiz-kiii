import enum


class Status(enum.Enum):
    NEW = 'new'
    ANNOTATED = 'annotated'
    VALIDATED = 'validated'


class AnnotationSpanDatasetTag():

    def __init__(self, andt):
        self.annotation_span_id = andt['annotation_span_id']
        self.dataset_tag_id = andt['dataset_tag_id']
        self.tag = andt['tag']
        self.source = andt['source']
        self.removed = andt['removed']
        self.removedBy = andt['removedBy']
        self.start_char = andt['start_char']
        self.end_char = andt['end_char']
        self.dataset_title = andt['dataset_title']
        # annotation_span: AnnotationSpan = db.relationship("AnnotationSpan")
        # dataset_tag: DatasetTag = db.relationship("DatasetTag")

    @property
    def serialized(self):
        return {
            'id': self.annotation_span_id,
            'dataset_id': self.dataset_title,
            'tag': self.tag,
            'source': self.source,
            'removed': self.removed,
            'removedBy': self.removedBy,
            'start_char': self.start_char,
            'end_char': self.end_char,
            'text': self.tag
        }
