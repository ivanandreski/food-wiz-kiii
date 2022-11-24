from flask import Flask
from flask import jsonify, request

from import_corpus import import_corpus

app = Flask(__name__)

@app.route('/api/convert/corpus', methods=['POST'])
def convert_json():
    files = request.files.getlist("file[]")
    file = files[0]
   
    return import_corpus(file)