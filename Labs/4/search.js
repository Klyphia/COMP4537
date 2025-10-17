// search.js - JavaScript for the Search page
const API_BASE_URL = 'http://64.181.233.131:8888/api/definitions';

// Initialize page with strings
document.getElementById('pageTitle').textContent = STRINGS.SEARCH_TITLE;
document.getElementById('searchLabel').textContent = STRINGS.SEARCH_LABEL;
document.getElementById('searchButton').textContent = STRINGS.SEARCH_BUTTON;
document.getElementById('searchInput').placeholder = STRINGS.SEARCH_PLACEHOLDER;

const form = document.getElementById('searchForm');
const displayArea = document.getElementById('displayArea');

// Validate search input
function validateSearchInput(word) {
    if (!word || word.trim() === '') {
        return { valid: false, message: STRINGS.VALIDATION_EMPTY_WORD };
    }
    
    const wordPattern = /^[a-zA-Z\-']+$/;
    if (!wordPattern.test(word.trim())) {
        return { valid: false, message: STRINGS.VALIDATION_INVALID_WORD };
    }
    
    return { valid: true };
}

// Display search result
function displayResult(content, type) {
    displayArea.innerHTML = content;
    displayArea.className = type;
    displayArea.style.display = 'block';
}

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const searchWord = document.getElementById('searchInput').value;
    
    // Validate input
    const validation = validateSearchInput(searchWord);
    if (!validation.valid) {
        displayResult(validation.message, 'error');
        return;
    }
    
    // Create GET request URL with query parameter
    const searchURL = `${API_BASE_URL}?word=${encodeURIComponent(searchWord.trim())}`;
    
    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('GET', searchURL, true);
    
    // Handle response
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                
                // Display the word and definition
                let content = `<div class="word-result">${response.word}</div>`;
                content += `<div class="definition-result">${STRINGS.RESPONSE_DEFINITION} ${response.definition}</div>`;
                content += `<div class="request-info">${STRINGS.RESPONSE_REQUEST_NUM}${response.totalRequestsServed || response.requestNumber}</div>`;
                
                displayResult(content, 'success');
            } catch (e) {
                displayResult(STRINGS.ERROR_SERVER + ' (Invalid JSON from server)', 'error');
            }
        } else if (xhr.status === 404) {
            try {
                const response = JSON.parse(xhr.responseText);
                const message = `${STRINGS.RESPONSE_REQUEST_NUM}${response.totalRequestsServed || response.requestNumber || 'N/A'}<br>${STRINGS.ERROR_NOT_FOUND}: "${searchWord}"`;
                displayResult(message, 'not-found');
            } catch (e) {
                displayResult(`${STRINGS.ERROR_NOT_FOUND}: "${searchWord}"`, 'not-found');
            }
        } 
        // Handle 400 Bad Request
        else if (xhr.status === 400) {
            try {
                const response = JSON.parse(xhr.responseText);
                displayResult(`${response.message || STRINGS.ERROR_SERVER}`, 'error');
            } catch (e) {
                displayResult(`${STRINGS.ERROR_SERVER} (Status: 400 Bad Request)`, 'error');
            }
        }
        else {
            displayResult(`${STRINGS.ERROR_SERVER} (Status: ${xhr.status})`, 'error');
        }
    };
    
    xhr.onerror = function() {
        displayResult(STRINGS.ERROR_NETWORK, 'error');
    };
    
    // Send request
    xhr.send();
});