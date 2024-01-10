var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var currentUserName = currentUser[0].username;

function showDeletedNotes() {
    const deletedNotesContainer = document.getElementById("notes");

    const storedDeletedNotes = localStorage.getItem(currentUserName + "deletedNotes");
    if (storedDeletedNotes) {
        const deletedNotes = JSON.parse(storedDeletedNotes);

        deletedNotes.forEach((note, index) => {
            const deletedNoteDiv = document.createElement("div");
            deletedNoteDiv.className = "card shadow";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "deleteBtn btn btn-danger";
            deleteBtn.innerHTML = "Delete";

            const titlePara = document.createElement("h1");
            titlePara.textContent = note.title;

            const contentPara = document.createElement("p");
            contentPara.textContent = note.note;

            deleteBtn.addEventListener("click", function() {
                // Silinecek notu localStorage'den ve listeden kaldır
                deletedNotes.splice(index, 1);
                localStorage.setItem(currentUserName + "deletedNotes", JSON.stringify(deletedNotes));
                
                // Div'i sayfadan kaldır
                deletedNoteDiv.remove();
            });

            deletedNoteDiv.appendChild(titlePara);
            deletedNoteDiv.appendChild(contentPara);
            deletedNoteDiv.appendChild(deleteBtn);

            deletedNotesContainer.appendChild(deletedNoteDiv);
        });
    }
}
showDeletedNotes();

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function(event) {
  const searchText = event.target.value.toLowerCase();
  const allNotes = document.querySelectorAll('.card');

  allNotes.forEach(note => {
    const title = note.querySelector('h1').innerText.toLowerCase();
    const content = note.querySelector('p').innerText.toLowerCase();
    const shouldShow = title.includes(searchText) || content.includes(searchText);
    note.style.display = shouldShow ? 'block' : 'none';
  });
});




