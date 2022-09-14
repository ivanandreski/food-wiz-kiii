from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

from app.repository.annotation_span_repository import AnnotationSpanRepository
from app.repository.document_repository import DocumentRepository
from app.service.annotation_span_service import AnnnotationSpanService
from app.service.utilities import Utilities

annotation_spans = Blueprint('annotation_span_routes', __name__)

annotationSpanService = AnnnotationSpanService(AnnotationSpanRepository(), DocumentRepository())

# /api/annotation_span
@annotation_spans.route('/', methods=['GET'])
@cross_origin(origin='*')
def get_all():
    annotation_span = annotationSpanService.get_all()

    return jsonify(Utilities.serialize_list(annotation_span))

@annotation_spans.route('/<id>', methods=['GET'])
@cross_origin(origin='*')
def get_by_id(id):
    annotation_span = annotationSpanService.get_by_id(id)

    return annotation_span.serialized

@annotation_spans.route('/', methods=['POST'])
@cross_origin(origin='*')
def add():
    start_char = request.form.get('start_char')
    end_char = request.form.get('end_char')
    text = request.form.get('text')
    document_id = request.form.get('document_id')
    annotation_span = annotationSpanService.save(start_char, end_char, text, document_id)

    return annotation_span.serialized

@annotation_spans.route('/<id>/delete', methods=['DELETE'])
@cross_origin(origin='*')
def delete(id):
    result = annotationSpanService.delete(id)

    return result