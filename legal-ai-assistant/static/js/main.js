document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const documentText = document.getElementById('documentText');
    const questionInput = document.getElementById('questionInput');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const askBtn = document.getElementById('askBtn');
    const clearBtn = document.getElementById('clearBtn');
    const outputDiv = document.getElementById('output');
    const loadingSpinner = document.getElementById('loading');

    // Event Listeners
    summarizeBtn.addEventListener('click', handleSummarize);
    askBtn.addEventListener('click', handleAskQuestion);
    clearBtn.addEventListener('click', clearAll);
    
    // Allow Enter key to submit questions
    questionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAskQuestion();
        }
    });

    // Handle Summarize button click
    async function handleSummarize() {
        const text = documentText.value.trim();
        
        if (!text) {
            showError('Please enter some text to summarize');
            return;
        }

        try {
            showLoading(true);
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate summary');
            }

            displayOutput(data.summary || 'No summary generated');
        } catch (error) {
            showError(error.message || 'An error occurred while summarizing the document');
            console.error('Error:', error);
        } finally {
            showLoading(false);
        }
    }

    // Handle Ask Question button click
    async function handleAskQuestion() {
        const text = documentText.value.trim();
        const question = questionInput.value.trim();
        
        if (!text) {
            showError('Please enter a document first');
            return;
        }
        
        if (!question) {
            showError('Please enter a question');
            return;
        }

        try {
            showLoading(true);
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, question })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to get an answer');
            }

            displayOutput(`Q: ${question}\n\nA: ${data.answer}`);
            questionInput.value = ''; // Clear the question input
        } catch (error) {
            showError(error.message || 'An error occurred while processing your question');
            console.error('Error:', error);
        } finally {
            showLoading(false);
        }
    }

    // Display output in the output div
    function displayOutput(content) {
        outputDiv.textContent = content;
    }

    // Show error message
    function showError(message) {
        outputDiv.innerHTML = `<div class="error-message">${message}</div>`;
    }

    // Show/hide loading spinner
    function showLoading(show) {
        loadingSpinner.style.display = show ? 'flex' : 'none';
        if (!show) {
            outputDiv.style.display = 'block';
        }
    }

    // Clear all inputs and outputs
    function clearAll() {
        documentText.value = '';
        questionInput.value = '';
        outputDiv.textContent = '';
    }

    // Initialize the UI
    function init() {
        outputDiv.textContent = 'Your results will appear here...';
    }

    // Initialize the application
    init();
});