// legal-ai-assistant/static/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const documentText = document.getElementById('document-text');
    const summarizeBtn = document.getElementById('summarize-btn');
    const askBtn = document.getElementById('ask-btn');
    const questionContainer = document.getElementById('question-container');
    const questionInput = document.getElementById('question-input');
    const submitQuestion = document.getElementById('submit-question');
    const output = document.getElementById('output');
    const loading = document.getElementById('loading');

    // Toggle question input
    askBtn.addEventListener('click', () => {
        questionContainer.style.display = 'block';
        questionInput.focus();
    });

    // Handle summarize button click
    summarizeBtn.addEventListener('click', async () => {
        const text = documentText.value.trim();
        if (!text) {
            alert('Please enter some text to summarize');
            return;
        }

        await processRequest('/api/summarize', { text }, 'summary');
    });

    // Handle question submission
    submitQuestion.addEventListener('click', async () => {
        const text = documentText.value.trim();
        const question = questionInput.value.trim();
        
        if (!question) {
            alert('Please enter a question');
            return;
        }

        await processRequest('/api/ask', { 
            text, 
            question 
        }, 'answer');
    });

    // Enable/disable ask button based on text input
    documentText.addEventListener('input', () => {
        askBtn.disabled = !documentText.value.trim();
    });

    // Allow Enter key to submit question
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitQuestion.click();
        }
    });

    // Helper function to handle API requests
    async function processRequest(endpoint, data, responseKey) {
        showLoading(true);
        output.textContent = '';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            // Display the result
            output.innerHTML = formatOutput(result[responseKey], responseKey);
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
            console.error('Error:', error);
        } finally {
            showLoading(false);
        }
    }

    // Format the output with proper styling
    function formatOutput(text, type) {
        if (type === 'summary') {
            // Convert markdown-like bullet points to HTML
            return text.split('\n').map(line => {
                if (line.startsWith('- ')) {
                    return `<p>• ${line.substring(2)}</p>`;
                }
                return `<p>${line}</p>`;
            }).join('');
        }
        return `<p><strong>Answer:</strong> ${text}</p>`;
    }

    // Show/hide loading indicator
    function showLoading(show) {
        loading.style.display = show ? 'flex' : 'none';
    }
});