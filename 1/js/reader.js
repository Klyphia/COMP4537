const STORAGE_KEY = 'notes';
let retrieveInterval;

function loadNotes() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored).map(noteObj => noteObj.content);
    }
    return [];
}

function updateRetrievedTime() {
    const time = new Date().toLocaleTimeString();
    document.getElementById('retrieved-time').textContent = `${MESSAGES.retrieved}${time}`;
}

function renderNotes() {
    const container = document.getElementById('notes-container');
    container.innerHTML = '';
    const notes = loadNotes();
    notes.forEach(content => {
        const div = document.createElement('div');
        div.classList.add('note-display');
        div.textContent = content;
        container.appendChild(div);
    });
    updateRetrievedTime();
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotes();
    retrieveInterval = setInterval(renderNotes, 2000);

    const backButton = document.querySelector('a.btn-secondary');
    backButton.textContent = MESSAGES.backButton;
});

//ChatGPT recommended I split my js files into note.js, reader.js, and writer.js so I did that