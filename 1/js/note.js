class Note {
    constructor(content = '', index, onRemove, onUpdate) {
        this.content = content;
        this.index = index;
        this.onRemove = onRemove;
        this.onUpdate = onUpdate;
        this.textarea = document.createElement('textarea');
        this.textarea.value = this.content;
        this.textarea.addEventListener('input', () => {
            this.updateContent();
            this.onUpdate(this.index, this.content);
        });
        this.removeBtn = document.createElement('button');
        this.removeBtn.textContent = MESSAGES.removeButton;
        this.removeBtn.classList.add('btn', 'btn-danger', 'remove-btn');
        this.removeBtn.onclick = () => this.remove();
    }

    updateContent() {
        this.content = this.textarea.value;
    }

    remove() {
        this.onRemove(this.index);
    }

    getElement() {
        const div = document.createElement('div');
        div.classList.add('d-flex', 'align-items-start', 'mb-3');
        div.appendChild(this.textarea);
        div.appendChild(this.removeBtn);
        return div;
    }
}

//ChatGPT recommended I split my js files into note.js, reader.js, and writer.js so I did that