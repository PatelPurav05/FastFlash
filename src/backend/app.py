import time
from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import os
import typing_extensions as typing
from werkzeug.utils import secure_filename

class Definitions(typing.TypedDict):
  word: str
  definition: str
  
TEMP_UPLOAD_FOLDER = 'temp_uploads'

# Ensure the temporary upload directory exists
if not os.path.exists(TEMP_UPLOAD_FOLDER):
    os.makedirs(TEMP_UPLOAD_FOLDER)

genai.configure(api_key=os.environ["API_KEY"])
myfile = genai.upload_file("D:\Documents\Projects\FastFlash\\fast-flash\src\\backend\\testfile.pdf")
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

@app.route('/get_gemini_response', methods=['POST'])
def get_gemini_response():
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
            [file_path, "\n\n", "Can you generate 10 keywords and definitions from this file?"])
            print(response.text)
            return response.text
        finally:
            # Clean up: Remove the file after processing
            if os.path.exists(file_path):
                os.remove(file_path)