// store.js - JavaScript for the Add Definition page
const API_BASE_URL = 'https://comp4537alexhe.onrender.com/api/definitions';

// Initialize page with strings
document.getElementById('pageTitle').textContent = STRINGS.STORE_TITLE;
document.getElementById('wordLabel').textContent = STRINGS.STORE_WORD_LABEL;
document.getElementById('definitionLabel').textContent = STRINGS.STORE_DEFINITION_LABEL;
document.getElementById('submitButton').textContent = STRINGS.STORE_SUBMIT_BUTTON;
document.getElementById('wordInput').placeholder = STRINGS.STORE_WORD_PLACEHOLDER;
document.getElementById('definitionInput').placeholder = STRINGS.STORE_DEFINITION_PLACEHOLDER;

const form = document.getElementById('definitionForm');
const responseArea = document.getElementById('responseArea');

// Form validation function
function validateInput(word, definition) {
    // Check if word is empty
    if (!word || word.trim() === '') {
        return { valid: false, message: STRINGS.VALIDATION_EMPTY_WORD };
    }
    
    // Check if definition is empty
    if (!definition || definition.trim() === '') {
        return { valid: false, message: STRINGS.VALIDATION_EMPTY_DEFINITION };
    }
    
    // Check if word contains only letters (and possibly hyphens/apostrophes)
    const wordPattern = /^[a-zA-Z\-']+$/;
    if (!wordPattern.test(word.trim())) {
        return { valid: false, message: STRINGS.VALIDATION_INVALID_WORD };
    }
    
    // Check if definition contains valid characters (letters, spaces, punctuation)
    const definitionPattern = /^[a-zA-Z\s.,;:'"!\-()]+$/;
    if (!definitionPattern.test(definition.trim())) {
        return { valid: false, message: STRINGS.VALIDATION_INVALID_DEFINITION };
    }
    
    return { valid: true };
}

// Display response message
function displayResponse(message, type) {
    responseArea.textContent = message;
    responseArea.className = type;
    responseArea.style.display = 'block';
}

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const word = document.getElementById('wordInput').value;
    const definition = document.getElementById('definitionInput').value;
    
    // Validate input
    const validation = validateInput(word, definition);
    if (!validation.valid) {
        displayResponse(validation.message, 'error');
        return;
    }
    
    // Prepare request body
    const requestBody = JSON.stringify({
        word: word.trim(),
        definition: definition.trim()
    });
    
    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_BASE_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // Handle response
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                
                // Handle 409 Conflict separately for clarity
                if (xhr.status === 409) {
                    displayResponse(
                        `${STRINGS.ERROR_WORD_EXISTS}\n${STRINGS.RESPONSE_REQUEST_NUM}${response.totalRequestsServed || response.requestNumber || 'N/A'}`,
                        'warning'
                    );
                } else {
                    // SUCCESS (Status 201 Created or 200 OK)
                    let message = `${STRINGS.SUCCESS_ADDED}\n`;
                    message += `${STRINGS.RESPONSE_REQUEST_NUM}${response.totalRequestsServed || response.requestNumber}\n`;
                    if (response.totalEntries) {
                        message += `${STRINGS.RESPONSE_TOTAL_ENTRIES} ${response.totalEntries}\n`;
                    }
                    message += `\n${STRINGS.RESPONSE_NEW_ENTRY}\n"${response.word}: ${response.definition}"`;
                    
                    displayResponse(message, 'success');
                    
                    // Clear form
                    form.reset();
                }
            } catch (e) {
                displayResponse(STRINGS.ERROR_SERVER + ' (Invalid JSON from server)', 'error');
            }
        } 
        // Handle 400 Bad Request to display server validation errors
        else if (xhr.status === 400) {
            try {
                const response = JSON.parse(xhr.responseText);
                displayResponse(`${response.message || STRINGS.ERROR_SERVER}`, 'error');
            } catch (e) {
                displayResponse(`${STRINGS.ERROR_SERVER} (Status: 400 Bad Request)`, 'error');
            }
        }
        else {
            displayResponse(`${STRINGS.ERROR_SERVER} (Status: ${xhr.status})`, 'error');
        }
    };
    
    xhr.onerror = function() {
        displayResponse(STRINGS.ERROR_NETWORK, 'error');
    };
    
    // Send request
    xhr.send(requestBody);
});