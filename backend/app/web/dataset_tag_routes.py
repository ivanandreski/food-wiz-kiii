from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

from app.repository.dataset_tag_repository import DatasetTagRepository
from app.service.dataset_tag_service import DatasetTagService
from app.service.utilities import Utilities

dataset_tags = Blueprint('dataset_tag_routes', __name__)

datasetTagService = DatasetTagService(DatasetTagRepository())

# /api/datasetTag
@dataset_tags.route('/', methods=['GET'])
@cross_origin(origin='*')
def get_all():
    datasetFilter = request.args.get("datasets")
    if datasetFilter is None:
        return jsonify(Utilities.serialize_list(datasetTagService.get_all()))

    dataset_tag = datasetTagService.get_all_by_dataset_filter(datasetFilter)

    return jsonify(dataset_tag)

@dataset_tags.route('/<id>', methods=['GET'])
@cross_origin(origin='*')
def get_by_id(id):
    dataset_tag = datasetTagService.get_by_id(id)

    return dataset_tag.serialized

@dataset_tags.route('/', methods=['POST'])
@cross_origin(origin='*')
def add():
    id = request.form.get('id')
    tag_name = request.form.get('tag_name')
    link = request.form.get('link')
    description = request.form.get('description')
    dataset_id = request.form.get('dataset_id')
    dataset_tag = datasetTagService.save(id=id, tag_name=tag_name, link=link, description=description, dataset_id=dataset_id)

    return dataset_tag.serialized

@dataset_tags.route('/<id>/edit', methods=['PUT'])
@cross_origin(origin='*')
def edit(id):
    tag_name = request.form.get('tag_name')
    link = request.form.get('link')
    description = request.form.get('description')
    dataset_id = request.form.get('dataset_id')
    dataset_tag = datasetTagService.save(id=id, tag_name=tag_name, link=link, description=description, dataset_id=dataset_id)

    return dataset_tag.serialized

@dataset_tags.route('/<id>/delete', methods=['DELETE'])
@cross_origin(origin='*')
def delete(id):
    dataset_tag = datasetTagService.delete(id)

    return dataset_tag.serialized