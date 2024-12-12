// Select Elements
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteButton');
const notesContainer = document.getElementById('notesContainer');
const toggleMode = document.getElementById('toggleMode');

// Retrieve notes from localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem('notes')) || [];
}

// Save notes to localStorage
function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Display Notes
function displayNotes() {
  notesContainer.innerHTML = '';
  const notes = getNotes();
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML =
     `
      <p contenteditable="false">${note}</p>
      <button class="edit" onclick="editNote(${index})">✏️ Edit</button>
      <button onclick="deleteNote(${index})">❌ Delete</button>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

// Add New Note
addNoteButton.addEventListener('click', () => {
  const noteText = noteInput.value.trim();
  if (noteText) {
    const notes = getNotes();
    notes.push(noteText);
    saveNotes(notes);
    noteInput.value = '';
    displayNotes();
  } else {
    alert('Please write something!');
  }
});

// Edit Note
function editNote(index) {
  const notes = getNotes();
  const noteDiv = notesContainer.children[index];
  const noteText = noteDiv.querySelector('p');
  const editButton = noteDiv.querySelector('.edit');

  if (editButton.textContent === '✏️ Edit') {
    noteText.contentEditable = true;
    noteText.focus();
    editButton.textContent = '💾 Save';
  } else {
    noteText.contentEditable = false;
    notes[index] = noteText.textContent;
    saveNotes(notes);
    editButton.textContent = '✏️ Edit';
  }
}

// Delete Note
function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  displayNotes();
}

// Toggle Dark Mode
toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleMode.textContent =
    document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initialize App
displayNotes();
