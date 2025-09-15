from flask import Flask, request, jsonify
from .services.vertex_ai import VertexAIService
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
vertex_ai_service = VertexAIService()

@app.route('/')
def home():
    return app.send_static_file('../templates/index.html')

@app.route('/api/summarize', methods=['POST'])
def summarize():
    try:
        data = request.get_json()
        text = data.get('text', '')
        if not text:
            return jsonify({'error': 'No text provided'}), 400
            
        summary = vertex_ai_service.summarize_document(text)
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        text = data.get('text', '')
        question = data.get('question', '')
        
        if not text or not question:
            return jsonify({'error': 'Both text and question are required'}), 400
            
        answer = vertex_ai_service.answer_question(text, question)
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
{{ ... }}
