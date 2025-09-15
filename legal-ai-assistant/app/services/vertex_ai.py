# legal-ai-assistant/app/services/vertex_ai.py
import os
import google.cloud.aiplatform as aiplatform
from google.oauth2 import service_account

class VertexAIService:
    def __init__(self):
        self.project_id = os.getenv('GOOGLE_CLOUD_PROJECT')
        self.location = 'us-central1'  # Update if your region is different
        self.initialize_vertex_ai()

    def initialize_vertex_ai(self):
        """Initialize the Vertex AI client."""
        credentials = None
        if 'GOOGLE_APPLICATION_CREDENTIALS' in os.environ:
            credentials = service_account.Credentials.from_service_account_file(
                os.environ['GOOGLE_APPLICATION_CREDENTIALS']
            )
            
        aiplatform.init(
            project=self.project_id,
            location=self.location,
            credentials=credentials
        )

    def generate_text(self, prompt, max_output_tokens=1024):
        """Generate text using Vertex AI's text generation model."""
        from vertexai.preview.generative_models import GenerativeModel
        
        model = GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(
            prompt,
            generation_config={
                "max_output_tokens": max_output_tokens,
                "temperature": 0.2,
            },
        )
        return response.text

    def summarize_document(self, text):
        """Generate a summary of the provided legal document."""
        prompt = f"""You are a legal expert. Please provide a clear, concise summary of the following legal document. 
        Focus on the key points, parties involved, and any important clauses or conditions.
        
        Document:
        {text}
        
        Summary:"""
        return self.generate_text(prompt)

    def answer_question(self, text, question):
        """Answer a question about the provided legal document."""
        prompt = f"""You are a legal expert. Please answer the following question based on the provided legal document.
        If the answer cannot be found in the document, state that clearly.
        
        Document:
        {text}
        
        Question: {question}
        
        Answer:"""
        return self.generate_text(prompt)