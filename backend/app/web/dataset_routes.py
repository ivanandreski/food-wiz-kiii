from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

from app.repository import importer
from app.repository.dataset_repository import DatasetRepository
from app.repository.dataset_tag_repository import DatasetTagRepository
from app.repository.annotation_span_dataset_tag_repository import AnnotationSpanDatasetTagRepository
from app.repository.annotation_span_repository import AnnotationSpanRepository
from app.service.dataset_service import DatasetService
from app.service.dataset_tag_service import DatasetTagService
from app.service.utilities import Utilities
from app.service.annotation_span_dataset_tag_service import AnnotationSpanDatasetTagService
from app.web.user_routes import token_required

datasets = Blueprint('dataset_routes', __name__)

datasetService = DatasetService(DatasetRepository())
datasetTagService = DatasetTagService(DatasetTagRepository())
annotationSpanDatasetTagService = AnnotationSpanDatasetTagService(AnnotationSpanDatasetTagRepository(), AnnotationSpanRepository(), DatasetTagRepository())

# /api/dataset
@datasets.route('/', methods=['GET'])
@cross_origin(origin='*')
def get_all():
    dataset = datasetService.get_all()

    return jsonify(Utilities.serialize_list(dataset))

@datasets.route('/<id>', methods=['GET'])
@cross_origin(origin='*')
def get_by_id(id):
    dataset = datasetService.get_by_id(id)

    return dataset.serialized

@datasets.route('/<id>', methods=['PUT'])
@token_required
@cross_origin(origin='*')
def add_to_annotation_span(current_user, id):
    print(request.headers)
    start = request.form.get('start')
    document_id = request.form.get('documentId')
    text = request.form.get('text').strip()

    return jsonify(annotationSpanDatasetTagService.create_new(start=start, text=text, tagId=id, document_id=document_id, current_user=current_user).serialized)

# add token
@datasets.route('/markDelete/<id>', methods=['PUT'])
@cross_origin(origin='*')
@token_required
def mark_for_remove(current_user, id):
    start = request.form.get('start')
    document_id = request.form.get('documentId')
    text = request.form.get('text').strip()

    end = int(start) + len(text)
    annotation_span_id = start + str(end) + str(document_id)

    return jsonify(annotationSpanDatasetTagService.mark_delete(a_id=annotation_span_id, d_id=id, current_user=current_user).serialized)


@datasets.route('/', methods=['POST'])
@cross_origin(origin='*')
def add():
    id = request.form.get('id')
    title = request.form.get('title')
    link = request.form.get('link')
    description = request.form.get('description')
    dataset = datasetService.save(id=id, title=title, link=link, description=description)

    return dataset.serialized

@datasets.route('/<id>/edit', methods=['PUT'])
@cross_origin(origin='*')
def edit(id):
    title = request.form.get('title')
    link = request.form.get('link')
    description = request.form.get('description')
    dataset = datasetService.edit(id=id, title=title, link=link, description=description)

    return dataset.serialized


@datasets.route('/<id>/delete', methods=['DELETE'])
@cross_origin(origin='*')
def delete(id):
    dataset = datasetService.delete(id)
    
    return dataset.serialized
    
# FOR DEVELOPMENT ONLY
# import dataset and dataset tags from dataset
@datasets.route('/convert', methods=['POST'])
@cross_origin(origin='*')
def convert_json():
    files = request.files.getlist("file[]")
    response = importer.import_dataset(files, datasetService, datasetTagService)
    return response