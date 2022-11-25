from flask import Flask
from flask import jsonify, request

from spacy_tokenizer_repository import SpacyTokenizerRepository
from default_ner_tag_repository import DefaultNerTagRepository
from utilities import Utilities
from models import AnnotationSpanDatasetTag

app = Flask(__name__)

tokenizerRepository = SpacyTokenizerRepository()
nerTagRepository = DefaultNerTagRepository(tokenizerRepository)


@app.route('/api/convert-annotation-spans', methods=['POST'])
def convert_spans():
    json_data = request.json
    annotationSpanDatasetTags = [AnnotationSpanDatasetTag(i) for i in json_data['annotationSpansDatasetTags']]
    tokens = nerTagRepository.annotation_spans_to_ner_array(
        json_data["text"], annotationSpanDatasetTags)

    return jsonify(Utilities.serialize_list(tokens))
