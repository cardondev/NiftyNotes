document.addEventListener("DOMContentLoaded", function () {
  displayNotes();

  document.getElementById("note-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const noteText = document.getElementById("note-text").value;

    if (noteText) {
      addItem("notes", { noteText });
      displayNotes();
    }
  });
});

function displayNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  const list = document.getElementById("notes-list");
  list.innerHTML = "";

  notes.forEach((note, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${note.noteText} <button onclick="deleteNote(${index})">Delete</button>`;
    listItem.style.whiteSpace = 'pre-wrap'; // To display newlines in the saved note
    list.appendChild(listItem);
  });
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}
