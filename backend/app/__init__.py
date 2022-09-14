from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='../.env')
db = SQLAlchemy()
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hhgfzhdcgfwf'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    from .models import Dataset, DatasetTag, Corpus, Document, AnnotationSpan, User

    db.init_app(app)
    Migrate(app, db)

    with app.app_context():
        db.create_all()

    from .web.dataset_routes import datasets
    from .web.annotation_span_routes import annotation_spans
    from .web.corpus_routes import corpuses
    from .web.dataset_tag_routes import dataset_tags
    from .web.document_routes import documents
    from .web.user_routes import users

    app.register_blueprint(annotation_spans, url_prefix='/api/annotation_span')
    app.register_blueprint(corpuses, url_prefix='/api/corpus')
    app.register_blueprint(datasets, url_prefix='/api/dataset')
    app.register_blueprint(dataset_tags, url_prefix='/api/datasetTag')
    app.register_blueprint(documents, url_prefix='/api/document')
    app.register_blueprint(users, url_prefix='/api/users')

    return app

