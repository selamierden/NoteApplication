var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var currentUserName = currentUser[0].username;

function writeCurrentUser(){
    var welcomeMessageSpan = document.getElementById("isim");
    welcomeMessageSpan.innerHTML = currentUserName;
}

const form = document.getElementById("inputForm");
const notesContainer = document.getElementById("notes");

form.addEventListener("submit", function(event) {
    event.preventDefault();
  
    const title = document.getElementById("title").value;
    const note = document.getElementById("note").value;
  
    addNoteToPage(title, note);
  
    document.getElementById("title").value = "";
    document.getElementById("note").value = "";
});

function addNoteToPage(title, note) {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerHTML = "Delete";

    const noteCard = document.createElement("div");
    noteCard.className = "card shadow";

    const cardContent = document.createElement("div");
    cardContent.innerHTML = `<h2>${title}</h2><p>${note}</p>`;

    noteCard.appendChild(cardContent);
    noteCard.appendChild(deleteBtn);

    notesContainer.appendChild(noteCard);

    const storedNotes = localStorage.getItem(currentUserName + "userNotes");
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    // Check if the note already exists
    const existingNoteIndex = notes.findIndex(n => n.title === title && n.note === note);

    if (existingNoteIndex !== -1) {
        // Update the existing note
        notes[existingNoteIndex] = { title, note };
    } else {
        // Add the new note
        notes.push({ title, note });
    }

    saveNotes(notes);
}

notesContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteBtn")) {
        
        const noteCard = event.target.parentElement;
        notesContainer.removeChild(noteCard);
        
        const storedNotes = localStorage.getItem(currentUserName + "userNotes");
        const notes = storedNotes ? JSON.parse(storedNotes) : [];
        
        // Silinen notu localStorage'den kaldır
        const title = noteCard.querySelector("h2").textContent;
        const note = noteCard.querySelector("p").textContent;
        const noteIndex = notes.findIndex(n => n.title === title && n.note === note);
        if (noteIndex !== -1) {
            notes.splice(noteIndex, 1);
            saveNotes(notes);
        }
    }
});

function saveNotes(notes) {
    localStorage.setItem(currentUserName + "userNotes", JSON.stringify(notes));
}

function loadNotes() {
    const storedNotes = localStorage.getItem(currentUserName + "userNotes");
    if (storedNotes) {
        const notes = JSON.parse(storedNotes);
  
        for (const note of notes) {
            addNoteToPage(note.title, note.note);
        }
    }
}

window.onload = function() {
    writeCurrentUser();
    loadNotes();
}

  
    

    





