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
    deleteBtn.className = "deleteBtn btn btn-danger";
    deleteBtn.innerHTML = "Delete";

    const colorSelect = document.createElement("input");
    colorSelect.className = "colorSelect"
    colorSelect.type = "color";

    colorSelect.addEventListener("input", function(event) {
        noteCard.style.backgroundColor = event.target.value;
    });

    const noteCard = document.createElement("div");
    noteCard.className = "card shadow";

    const cardContent = document.createElement("div");
    cardContent.innerHTML = `<h2>${title}</h2><p>${note}</p>`;
    cardContent.style.overflowY = "auto"

    noteCard.appendChild(cardContent);
    noteCard.appendChild(deleteBtn);

    notesContainer.appendChild(noteCard);

    const storedNotes = localStorage.getItem(currentUserName + "userNotes");
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    
    const existingNoteIndex = notes.findIndex(n => n.title === title && n.note === note);

    if (existingNoteIndex !== -1) {
        
        notes[existingNoteIndex] = { title, note };
    } else {
        
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

        const deletedNotesKey = currentUserName + "deletedNotes";
        const deletedNotes = localStorage.getItem(deletedNotesKey) ? JSON.parse(localStorage.getItem(deletedNotesKey)) : [];

        
        if (noteIndex !== -1) {
            // Silinen notu "deletedNotes" olarak adlandırılmış yeni bir localStorage anahtarına ekleyin
            deletedNotes.push({ title, note }); // Silinen notu "deletedNotes" listesine ekle
            localStorage.setItem(deletedNotesKey, JSON.stringify(deletedNotes)); // Güncellenmiş deletedNotes listesini localStorage'e kaydedin
            
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

const darkModeToggle = document.getElementById('toggle');
let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

function toggleDarkMode() {
  const body = document.body;
  const settingsBtn = document.getElementsByClassName("settings-icon")
  if (isDarkMode) {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    settingsBtn.style.backgroundColor = "white";

  } else {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
  }
  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
}

darkModeToggle.checked = isDarkMode;
toggleDarkMode();

darkModeToggle.addEventListener('change', () => {
  isDarkMode = !isDarkMode;
  toggleDarkMode();
});


const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function(event) {
  const searchText = event.target.value.toLowerCase();
  const allNotes = document.querySelectorAll('.card');

  allNotes.forEach(note => {
    const title = note.querySelector('h2').innerText.toLowerCase();
    const content = note.querySelector('p').innerText.toLowerCase();
    const shouldShow = title.includes(searchText) || content.includes(searchText);
    note.style.display = shouldShow ? 'block' : 'none';
  });
});

const goTrash = document.getElementById("trashBtn")
goTrash.addEventListener("click" , function(e) {
    window.location.href = "deletednote.html"
})

const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", function(){
    // Tüm not kartlarını seç
    const allNotes = document.querySelectorAll('.card');

    // localStorage için deletedNotes listesini al
    const deletedNotesKey = currentUserName + "deletedNotes";
    let deletedNotes = localStorage.getItem(deletedNotesKey) ? JSON.parse(localStorage.getItem(deletedNotesKey)) : [];

    // Her bir not kartını dön ve notesContainer'dan kaldır
    allNotes.forEach(note => {
        // Silinen notu localStorage'deki deletedNotes listesine ekle
        const title = note.querySelector('h2').innerText;
        const content = note.querySelector('p').innerText;
        deletedNotes.push({ title, note: content });
        
        // notesContainer'dan notu kaldır
        notesContainer.removeChild(note);
    });

    // localStorage'deki deletedNotes listesini güncelle ve kaydet
    localStorage.setItem(deletedNotesKey, JSON.stringify(deletedNotes));

    // localStorage'deki userNotes'u temizle
    localStorage.removeItem(currentUserName + "userNotes");
});

const settingsIcon = document.querySelector('.settings-icon');
const settingsMenu = document.querySelector('.settings-menu');

settingsIcon.addEventListener('click', () => {
    settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
});

const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const forProgrammersBtn = document.getElementById("forProgrammersBtn");
const toDoList = document.getElementById("toDoList");

deleteAccountBtn.addEventListener('click', () => {
    const users = JSON.parse(localStorage.getItem('users'));
    const filteredUsers = users.filter(user => user.username !== currentUserName);
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    console.log('Hesap silindi');

    localStorage.removeItem(currentUserName + "userNotes")
    localStorage.removeItem(currentUserName + "deletedNotes")

    localStorage.setItem("currentUser", []) 

    window.location.href = "index.html"
});

forProgrammersBtn.addEventListener("click", () => {

    window.location.href = "engineer.html"
})

toDoList.addEventListener("click", () => {

    window.location.href = "todo.html"
})

function displayTime() {
    var saatElement = document.getElementById("saat");
    var zaman = new Date();
    var saat = zaman.getHours();
    var dakika = zaman.getMinutes();
    var saniye = zaman.getSeconds();

    saat = saat < 10 ? "0" + saat : saat;
    dakika = dakika < 10 ? "0" + dakika : dakika;
    saniye = saniye < 10 ? "0" + saniye : saniye;

    var currentTime = saat + ":" + dakika + ":" + saniye;
    saatElement.textContent = currentTime;
  }

  setInterval(displayTime, 1000); // Her saniyede bir güncelle
  displayTime(); // Sayfa yüklendiğinde saatı göster

  document.addEventListener('DOMContentLoaded', function() {
    const currentDateElement = document.getElementById('currentDate');
  
    // API'den tarihi al
    fetch('https://worldtimeapi.org/api/ip')
      .then(response => response.json())
      .then(data => {
        const dateTime = new Date(data.datetime);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateTime.toLocaleDateString('tr-TR', options);
        currentDateElement.textContent = formattedDate;
      })
      .catch(error => {
        console.log('Tarih alınamadı: ', error);
        currentDateElement.textContent = 'Tarih alınamadı.';
      });
  });












  
    

    





