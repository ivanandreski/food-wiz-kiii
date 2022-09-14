from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

from app.repository import importer
from app.repository.corpus_repository import CorpusRepository
from app.repository.document_repository import DocumentRepository
from app.repository.dataset_repository import DatasetRepository
from app.repository.dataset_tag_repository import DatasetTagRepository
from app.repository.annotation_span_repository import AnnotationSpanRepository
from app.repository.annotation_span_dataset_tag_repository import AnnotationSpanDatasetTagRepository
from app.repository.corpus_dataset_repository import CorpusDatasetRepository
from app.service.corpus_service import CorpusService
from app.service.document_service import DocumentService
from app.service.dataset_service import DatasetService
from app.service.dataset_tag_service import DatasetTagService
from app.service.annotation_span_service import AnnnotationSpanService
from app.service.annotation_span_dataset_tag_service import AnnotationSpanDatasetTagService
from app.service.corpus_dataset_service import CorpusDatasetService
from app.service.utilities import Utilities

corpuses = Blueprint('corpus_routes', __name__)

corpusService = CorpusService(CorpusRepository(), DocumentRepository(), AnnotationSpanRepository(), AnnotationSpanDatasetTagRepository(), CorpusDatasetRepository())
documentService = DocumentService(DocumentRepository(), AnnotationSpanRepository())
datasetService = DatasetService(DatasetRepository())
datasetTagService = DatasetTagService(DatasetTagRepository())
annotationSpanService = AnnnotationSpanService(AnnotationSpanRepository(), DocumentRepository())
annotationSpanDatasetTagService = AnnotationSpanDatasetTagService(AnnotationSpanDatasetTagRepository(), AnnotationSpanRepository(), DatasetTagRepository())
corpusDatasetService = CorpusDatasetService(CorpusDatasetRepository())

# /api/corpus
@corpuses.route('/', methods=['GET'])
@cross_origin(origin='*')
def get_all():
    result = corpusService.get_all()
    return jsonify(Utilities.serialize_list(result))

@corpuses.route('/<id>', methods=['GET'])
@cross_origin(origin='*')
def get_by_id(id):
    args = request.args.to_dict()
    result = documentService.get_all_from_corpus(corpus_id=id, page_number=args["page"], per_page=args["perPage"])

    response = {
        "documents": Utilities.serialize_list(result.items),
        "page": result.page,
        "pageCount": result.pages
    }

    return jsonify(response)

# todo: all datasets with corpus id, from corpus_datsets
@corpuses.route('/<documentId>/datasets', methods=['GET'])
@cross_origin(origin='*')
def get_datasets_by(documentId):
    corpus_id = documentService.get_by_id(documentId).corpus_id
    corpus_datasets = corpusDatasetService.find_all_corpus_datasets_by(corpus_id)
    datasetString = ""
    datasets = []
    for cd in corpus_datasets:
        dataset = datasetService.get_by_id(cd.dataset_id)
        datasets.append(dataset)
        datasetString += dataset.id + ","

    # return jsonify(Utilities.serialize_list(datasets))

    response = {
        "datasets": Utilities.serialize_list(datasets),
        "string": datasetString
    }

    return jsonify(response)

@corpuses.route('/', methods=['POST'])
@cross_origin(origin='*')
def add():
    title = request.form.get('title')
    link = request.form.get('link')
    description = request.form.get('description')
    corpus = corpusService.save(title, link, description)

    return corpus.serialized

@corpuses.route('/<id>/edit', methods=['PUT'])
@cross_origin(origin='*')
def edit(id):
    title = request.form.get('title')
    link = request.form.get('link')
    description = request.form.get('description')
    corpus = corpusService.edit(id, title, link, description)

    return corpus.serialized

@corpuses.route('/<id>/delete', methods=['DELETE'])
@cross_origin(origin='*')
def delete(id):
    corpus = corpusService.delete(id)

    return corpus.serialized

# FOR DEVELOPMENT ONLY
# import corpus..
@corpuses.route('/convert', methods=['POST'])
@cross_origin(origin='*')
def convert_json():
    if len(datasetService.get_all()) == 0:
        data = {'message': 'No datasets found, please import datasets before corpus'}
        return jsonify(data), 500

    files = request.files.getlist("file[]")
    file = files[0]
    response = importer.import_corpus(file, corpusService, documentService, datasetService, datasetTagService, annotationSpanService, annotationSpanDatasetTagService, corpusDatasetService)
    return response