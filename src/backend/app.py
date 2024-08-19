import time
from flask import Flask, jsonify, request
import google.generativeai as genai
import os
import typing_extensions as typing

class Definitions(typing.TypedDict):
  word: str
  definition: str

genai.configure(api_key=os.environ["API_KEY"])
myfile = genai.upload_file("D:\Documents\Projects\FastFlash\\fast-flash\src\\backend\\testfile.pdf")
model = genai.GenerativeModel('gemini-1.5-flash',
                              # Set the `response_mime_type` to output JSON
                              # Pass the schema object to the `response_schema` field
                              generation_config={"response_mime_type": "application/json",
                                                 "response_schema": list[Definitions]})
app = Flask(__name__)

@app.route('/get_definitions')
def get_definitions():
    definitions = {
        'forest': 'collection of trees',
        'movies': 'includes storyline and characters',
    }
    return jsonify(definitions)

@app.route('/get_gemini_response')
def get_gemini_response():
    response = model.generate_content(
    [myfile, "\n\n", "Can you generate 10 keywords and definitions from this file?"])
    return response.text