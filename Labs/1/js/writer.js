const STORAGE_KEY = 'notes';
let notes = [];
let saveInterval;

function loadNotes() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored).map(noteObj => noteObj.content);
    }
    return [];
}

function saveNotes() {
    const notesToSave = notes.map(content => ({ content }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesToSave));
    updateSavedTime();
}

function updateSavedTime() {
    const time = new Date().toLocaleTimeString();
    document.getElementById('saved-time').textContent = `${MESSAGES.saved}${time}`;
}

function renderNotes() {
    const container = document.getElementById('notes-container');
    container.innerHTML = '';
    notes.forEach((content, index) => {
        const note = new Note(content, index, removeNote, updateNote);
        container.appendChild(note.getElement());
    });
}

function addNote() {
    notes.push('');
    renderNotes();
}

function removeNote(index) {
    notes.splice(index, 1);
    renderNotes();
    saveNotes(); 
}

function updateNote(index, newContent) {
    notes[index] = newContent;
}

document.addEventListener('DOMContentLoaded', () => {
    notes = loadNotes();
    renderNotes();
    updateSavedTime();

    document.getElementById('add-note').textContent = MESSAGES.addButton;
    document.getElementById('add-note').addEventListener('click', addNote);

    const backButton = document.querySelector('a.btn-secondary');
    backButton.textContent = MESSAGES.backButton;

    saveInterval = setInterval(saveNotes, 2000);
});

//ChatGPT recommended I split my js files into note.js, reader.js, and writer.js so I did that