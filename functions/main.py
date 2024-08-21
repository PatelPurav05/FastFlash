# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app

# initialize_app()
#
#
# @https_fn.on_request()
# def on_request_example(req: https_fn.Request) -> https_fn.Response:
#     return https_fn.Response("Hello world!")

import time
from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import os
import typing_extensions as typing
from werkzeug.utils import secure_filename
import functions_framework

class Definitions(typing.TypedDict):
  word: str
  definition: str
  
TEMP_UPLOAD_FOLDER = 'temp_uploads'

# Ensure the temporary upload directory exists
if not os.path.exists(TEMP_UPLOAD_FOLDER):
    os.makedirs(TEMP_UPLOAD_FOLDER)

genai.configure(api_key=os.environ["API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash',
                              # Set the `response_mime_type` to output JSON
                              # Pass the schema object to the `response_schema` field
                              generation_config={"response_mime_type": "application/json",
                                                 "response_schema": list[Definitions]})
app = Flask(__name__)
CORS(app)

@app.route('/get_definitions')
def get_definitions():
    definitions = {
        'forest': 'collection of trees',
        'movies': 'includes storyline and characters',
    }
    return jsonify(definitions)

@app.route('/get_gemini_response/<int:count>', methods=['POST'])
def get_gemini_response(count):
    file = request.files['file']
    if file:
        # Secure the filename
        filename = secure_filename(file.filename)
        
        # Construct the file path
        file_path = os.path.join(TEMP_UPLOAD_FOLDER, filename)
        
        # Save the file to the temporary directory
        file.save(file_path)
        
        try:
            response = model.generate_content(
            [file_path, "\n\n", f"Can you generate {count} keywords and definitions from this file?"])
            print(response.text)
            return response.text
        finally:
            # Clean up: Remove the file after processing
            if os.path.exists(file_path):
                os.remove(file_path)

functions_framework.http('app', app)