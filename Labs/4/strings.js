// User-facing strings for the Dictionary Application
// Storing all UI strings in a separate file as per assignment requirements

const STRINGS = {
    // Store page strings
    STORE_TITLE: "Add Word Definition",
    STORE_WORD_LABEL: "Word:",
    STORE_DEFINITION_LABEL: "Definition:",
    STORE_SUBMIT_BUTTON: "Add to Dictionary",
    STORE_WORD_PLACEHOLDER: "Enter a word (letters only)",
    STORE_DEFINITION_PLACEHOLDER: "Enter the definition",
    
    // Search page strings
    SEARCH_TITLE: "Search Dictionary",
    SEARCH_LABEL: "Search for a word:",
    SEARCH_BUTTON: "Search",
    SEARCH_PLACEHOLDER: "Enter a word to search",
    
    // Validation messages
    VALIDATION_EMPTY_WORD: "Please enter a word",
    VALIDATION_EMPTY_DEFINITION: "Please enter a definition",
    VALIDATION_INVALID_WORD: "Word must contain only letters",
    VALIDATION_INVALID_DEFINITION: "Definition must contain only letters and spaces",
    
    // Success messages
    SUCCESS_ADDED: "Word successfully added to dictionary!",
    
    // Error messages
    ERROR_WORD_EXISTS: "This word already exists in the dictionary",
    ERROR_NETWORK: "Network error. Please check your connection and try again.",
    ERROR_SERVER: "Server error. Please try again later.",
    ERROR_NOT_FOUND: "Word not found in dictionary",
    
    // Response labels
    RESPONSE_REQUEST_NUM: "Request #",
    RESPONSE_TOTAL_ENTRIES: "Total entries in dictionary:",
    RESPONSE_NEW_ENTRY: "New entry recorded:",
    RESPONSE_DEFINITION: "Definition:"
};

// Make STRINGS available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = STRINGS;
}