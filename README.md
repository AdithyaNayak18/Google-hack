# Legal AI Assistant

![Legal AI Assistant Demo](https://img.shields.io/badge/Status-Active-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/Flask-2.0%2B-lightgrey)

A web-based application that leverages Google's Vertex AI (Gemini 1.5 Pro) to help users understand legal documents through AI-powered summarization and question-answering capabilities.

## 📋 Table of Contents
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## ✨ Features

- **Document Summarization**: Get concise, easy-to-understand summaries of legal documents
- **Q&A Interface**: Ask specific questions about the content of legal documents
- **User-Friendly Interface**: Clean, responsive web interface
- **Real-time Processing**: Get AI-powered insights in seconds

## 🛠 How It Works

The Legal AI Assistant works by:

1. Accepting user-uploaded legal documents through a web interface
2. Processing the text using Google's Vertex AI (Gemini 1.5 Pro)
3. Providing two main functionalities:
   - **Summarization**: Generates a concise summary of the legal document
   - **Q&A**: Answers specific questions about the document's content

The application is built with:
- **Backend**: Python with Flask
- **Frontend**: HTML, CSS, and JavaScript
- **AI/ML**: Google Vertex AI (Gemini 1.5 Pro)
- **Deployment**: Containerized with Docker for easy deployment

## 📋 Prerequisites

- Python 3.8 or higher
- Google Cloud account with billing enabled
- Google Cloud Project with Vertex AI API enabled
- Service account key with Vertex AI User permissions

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/legal-ai-assistant.git
   cd legal-ai-assistant
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## ⚙️ Configuration

1. **Set up Google Cloud credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new service account or use an existing one
   - Download the JSON key file
   - Move the key file to the project directory

2. **Configure environment variables**:
   Create a `.env` file in the project root with the following content:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json
   GOOGLE_CLOUD_PROJECT=your-project-id
   ```

## 🏃 Running the Application

1. **Start the Flask development server**:
   ```bash
   cd app
   export FLASK_APP=main.py
   export FLASK_ENV=development
   flask run
   ```

2. **Access the application**:
   Open your web browser and navigate to:
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
legal-ai-assistant/
├── app/
│   ├── services/
│   │   ├── __init__.py
│   │   └── vertex_ai.py
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── main.js
│   ├── templates/
│   │   └── index.html
│   ├── __init__.py
│   └── main.py
├── .env.example
├── .gitignore
├── README.md
└── requirements.txt
```

## 🌐 API Endpoints

- `GET /`: Serves the main application interface
- `POST /api/summarize`: Processes document summarization
  ```json
  {
    "text": "Your legal document text here..."
  }
  ```
- `POST /api/ask`: Answers questions about the document
  ```json
  {
    "text": "Your legal document text here...",
    "question": "Your question here..."
  }
  ```

## ☁️ Deployment

### Option 1: Google Cloud Run (Recommended)

1. **Install Google Cloud SDK**:
   ```bash
   curl https://sdk.cloud.google.com | bash
   gcloud init
   ```

2. **Build and deploy**:
   ```bash
   gcloud run deploy legal-ai-assistant --source .
   ```

### Option 2: Docker

1. **Build the Docker image**:
   ```bash
   docker build -t legal-ai-assistant .
   ```

2. **Run the container**:
   ```bash
   docker run -p 5000:5000 -e GOOGLE_APPLICATION_CREDENTIALS=/app/service-account.json -v /path/to/your/credentials.json:/app/service-account.json legal-ai-assistant
   ```

## 🐛 Troubleshooting

1. **Authentication Errors**:
   - Verify your service account has the "Vertex AI User" role
   - Ensure the JSON key file path in `.env` is correct

2. **Module Not Found Errors**:
   - Make sure you've activated the virtual environment
   - Run `pip install -r requirements.txt`

3. **API Rate Limiting**:
   - Check your Google Cloud quotas
   - Consider implementing caching for frequent requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Cloud Platform for the Vertex AI services
- The open-source community for various libraries and tools used in this project

---

**Note**: This application is for educational purposes only and should not be used as legal advice. Always consult with a qualified legal professional for legal matters.
