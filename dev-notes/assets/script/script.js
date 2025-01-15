const newNote = document.getElementById('new-note');
const containerNote = document.querySelector('.notes-container');
const search = document.getElementById('search');

document.getElementById('add-note').addEventListener('click', () => {
    addNote();
})


newNote.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addNote();
    }
});

function addNote () {
    const noteValue = newNote.value;
    if (!noteValue) {
         return;
    }
 
    const notes = getNotes();
    const note = {
     'id': generateId(),
     'value': noteValue,
     'fixed': false
    }
 
    createNote(note);
    newNote.value = '';
    notes.push(note);
    saveLocal(notes);
}

document.getElementById('export-csv').addEventListener('click', () => {
    const notes = getNotes();
    const csv = [
        ['id', 'nota', 'fixada?'], 
        ...notes.map(note => [note.id, note.value, note.fixed]) 
    ]
    .map(row => row.join(';'))
    .join('\n'); 
    
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.target = '_blank';
    a.download = 'notes.csv';
    a.click();
});

function createNote(note) {     
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content', 'flex');

    const noteText = document.createElement('textarea');
    noteText.value = note.value;
    noteText.id = note.id;

    noteText.placeholder = "Digite sua anotação";

    noteText.addEventListener('keyup', (e) => {
       updateNote(note.id, e.target.value);
    });

    const actions = document.createElement('div');
    actions.classList.add('note-actions', 'flex');

    noteContent.appendChild(noteText);
    actions.appendChild(createBtnPin(note, noteContent));
    actions.appendChild(createBtnDuplicateNote(note, noteContent));
    actions.appendChild(createBtnRemove(note.id));


    noteContent.appendChild(actions);
    containerNote.appendChild(noteContent);
}

function saveLocal(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || "[]");

    notes.sort((a, b) => {
        return a.fixed > b.fixed ? -1 : 1; 
    });

    return notes;
}

'aaa'.length

function showNotes() {
    const notes = getNotes();
    notes.forEach(note => {
        createNote(note);
    });
}

function updatePin(id) {
    const notes = getNotes();
    const note = notes.filter((note) => note.id === id)[0];
    note.fixed = !note.fixed;

    saveLocal(notes);
    containerNote.replaceChildren([]);
    showNotes();
}

function createBtnPin(note, noteContent) {
    let btn = document.createElement('button');
    const pin = document.createElement('i');

    if (note.fixed) {
        pin.classList.add('bi', "bi-pin-fill");
        noteContent.classList.add('fixed');
    } else {
        pin.classList.add('bi', "bi-pin");
    }

    btn.appendChild(pin);

    btn.addEventListener('click', function() {
        updatePin(note.id);
    });


    return btn;
}

function createBtnRemove(id) {
    let btn = document.createElement('button');
    const i = document.createElement('i');

    i.classList.add('bi','bi-x-lg');
    btn.appendChild(i);

    btn.addEventListener('click', function() {
        removeNote(btn, id);
    });

    return btn;
}

function removeNote(btn, id) {
    const notes = getNotes().filter(note => note.id !== id);
    btn.closest('.note-content').remove();
    saveLocal(notes);
}

function createBtnDuplicateNote(note) {
    let btn = document.createElement('button');
    const i = document.createElement('i');

    i.classList.add('bi','bi-file-earmark-plus');
    btn.appendChild(i);

    btn.addEventListener('click', function() {
        duplicateNote(note);
    });

    return btn;
}

function duplicateNote(note) {
    const notes = getNotes();
    const newNote = {
        'id':  generateId(),
        'value': document.getElementById(note.id).value,
        'fixed': false
    };

    createNote(newNote);
    notes.push(newNote);
    saveLocal(notes);
}

function updateNote(id, texto) {
    const notes = getNotes();
    const note = notes.filter((note) => note.id === id)[0];
    note.value = texto;

    saveLocal(notes);
}

function generateId() {
    return getNotes().length + 1;
}

search.addEventListener('keyup', () => {
    searchText = search.value;
    const notes = getNotes().filter((note) => note.value.includes(searchText));
    containerNote.replaceChildren([]);  

    if (searchText == '') {
        showNotes();
    }

    if (notes.length !== 0) {  
        containerNote.replaceChildren([]);  
        notes.forEach(note => {
            createNote(note);
        });
        return;
    }

});


showNotes();