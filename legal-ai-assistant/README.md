# Legal AI Assistant

A web application that uses Google Vertex AI (Gemini 1.5 Pro) to provide AI-powered summarization and question-answering for legal documents.

## Features

- **Document Summarization**: Get concise summaries of legal documents
- **Q&A**: Ask questions about the content of legal documents
- **Simple Web Interface**: Easy-to-use interface for interacting with the AI
- **Responsive Design**: Works on both desktop and mobile devices

## Prerequisites

- Python 3.8+
- Google Cloud account with Vertex AI API enabled
- Service account key with Vertex AI User permissions

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/legal-ai-assistant.git
   cd legal-ai-assistant
   ```

2. **Set up a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your Google Cloud credentials
   ```
   GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
   GOOGLE_CLOUD_PROJECT="your-project-id"
   ```

## Running the Application

1. **Start the development server**
   ```bash
   export FLASK_APP=app.main
   export FLASK_DEBUG=1
   flask run
   ```

2. **Access the application**
   Open your browser and navigate to: http://localhost:5000

## API Endpoints

- `POST /api/summarize` - Summarize a legal document
  ```json
  {
    "text": "Your legal document text here..."
  }
  ```

- `POST /api/ask` - Ask a question about a legal document
  ```json
  {
    "text": "Your legal document text here...",
    "question": "Your question here..."
  }
  ```

## Deployment

### Google Cloud Run

1. **Build the container**
   ```bash
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/legal-ai-assistant
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy legal-ai-assistant \
     --image gcr.io/[PROJECT_ID]/legal-ai-assistant \
     --platform managed \
     --region [REGION] \
     --allow-unauthenticated \
     --set-env-vars=GOOGLE_APPLICATION_CREDENTIALS="/app/service-account.json"
   ```

## Troubleshooting

- **403 Forbidden Error**: Ensure your service account has the `Vertex AI User` role
- **Module Not Found**: Make sure you've activated the virtual environment and installed all dependencies
- **Connection Errors**: Verify that the Flask server is running and accessible on the specified port

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
