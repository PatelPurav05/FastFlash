import time
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/get_definitions')
def get_definitions():
    definitions = {
        'forest': 'collection of trees',
        'movies': 'includes storyline and characters',
    }
    return jsonify(definitions)