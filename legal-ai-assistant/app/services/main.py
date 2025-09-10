# legal-ai-assistant/app/main.py
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import services
from services.vertex_ai import VertexAIService

app = Flask(__name__)
ai_service = VertexAIService()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    try:
        summary = ai_service.generate_summary(data['text'])
        return jsonify({'summary': summary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    if not all(k in data for k in ['text', 'question']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        answer = ai_service.answer_question(data['text'], data['question'])
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)