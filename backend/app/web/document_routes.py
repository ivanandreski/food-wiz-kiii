from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

from app.repository.default_ner_tag_repository import DefaultNerTagRepository
from app.repository.spacy_tokenizer_repository import SpacyTokenizerRepository
from app.repository.annotation_span_dataset_tag_repository import AnnotationSpanDatasetTagRepository
from app.repository.document_repository import DocumentRepository
from app.repository.annotation_span_repository import AnnotationSpanRepository
from app.service.annotation_span_dataset_tag_service import AnnotationSpanDatasetTagService
from app.service.document_service import DocumentService
from app.service.utilities import Utilities
from app.repository.dataset_tag_repository import DatasetTagRepository

documents = Blueprint('routes', __name__)

tokenizerRepository = SpacyTokenizerRepository()
nerTagRepository = DefaultNerTagRepository(tokenizerRepository)
documentService = DocumentService(DocumentRepository(), AnnotationSpanRepository())
annotationSpanDatasetTagService = AnnotationSpanDatasetTagService(AnnotationSpanDatasetTagRepository(), AnnotationSpanRepository(), DatasetTagRepository())

# /api/document
@documents.route('/', methods=['GET'])
@cross_origin(origin='*')
def get_all():
    document = documentService.get_all()

    return jsonify(Utilities.serialize_list(document))


@documents.route('/<id>', methods=['GET'])
@cross_origin(origin='*')
def get_by_id(id):
    datasetFilter = request.args.get("datasets")
    sourceFilter = request.args.get("sources")
    document = documentService.get_by_id(id)
    annotation_spans = annotationSpanDatasetTagService.find_by_document(id, datasetFilter, sourceFilter)
    tokens = nerTagRepository.annotation_spans_to_ner_array(document.text, annotation_spans)
    # datasets = Null

    response = {
        "document": document.serialized,
        "tokens": Utilities.serialize_list(tokens)
    }

    return jsonify(response)

@documents.route('/sources', methods=['GET'])
@cross_origin(origin='*')
def get_all_sources():
    sources = annotationSpanDatasetTagService.get_all_sources()

    return jsonify(list(map(lambda s: s[0], sources)))

@documents.route('/', methods=['POST'])
@cross_origin(origin='*')
def add():
    id = request.form.get('id')
    text = request.form.get('text')
    meta_data = request.form.get('meta_data')
    corpus_id = request.form.get('corpus_id')
    document = documentService.save(id, text, meta_data, corpus_id)

    return document.serialized


@documents.route('/<id>/edit', methods=['PUT'])
@cross_origin(origin='*')
def edit(id):
    text = request.form.get('text')
    status = request.form.get('status')
    corpus_id = request.form.get('corpus_id')
    document = documentService.edit(id, text, status, corpus_id)

    return document.serialized


@documents.route('/<id>/delete', methods=['DELETE'])
@cross_origin(origin='*')
def delete(id):
    document = documentService.delete(id)

    return document.serialize


@documents.route('/<id>/validate', methods=['PUT'])
@cross_origin(origin='*')
def validate(id):
    document = documentService.validate(id)

    return document.serialized
