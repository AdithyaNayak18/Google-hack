# legal-ai-assistant/app/services/vertex_ai.py
import os
import vertexai
from vertexai.generative_models import GenerativeModel

class VertexAIService:
    def __init__(self):
        # Initialize Vertex AI
        project_id = os.getenv("GOOGLE_CLOUD_PROJECT")
        location = "us-central1"
        vertexai.init(project=project_id, location=location)
        
        # Initialize the model
        self.model = GenerativeModel("gemini-1.5-pro")

    def generate_summary(self, text: str) -> str:
        """Generate a summary of the provided legal text."""
        prompt = f"""
        You are a legal document assistant. Please provide a clear, concise summary 
        of the following legal document. Focus on key points, obligations, rights, 
        and any important conditions. Use bullet points for better readability.
        
        Document:
        {text}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Error generating summary: {str(e)}")

    def answer_question(self, context: str, question: str) -> str:
        """Answer a question about the provided legal text."""
        prompt = f"""
        Based on the following legal document, please answer the question that follows.
        If the answer cannot be found in the document, state that clearly.
        
        Document:
        {context}
        
        Question: {question}
        Answer:
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Error generating answer: {str(e)}")