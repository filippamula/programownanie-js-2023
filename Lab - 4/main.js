const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const colorInput = document.querySelector("#color");
const pinnedInput = document.querySelector("#pinned");
const dateInput = document.querySelector("#date");
const tagsInput = document.querySelector("#tags");

const addNoteBtn = document.querySelector("#addNote");
const notesContainer = document.querySelector("#notesContainer");

const notes = [];

document.addEventListener("DOMContentLoaded", () => {
  const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"));
  if (notesFromLocalStorage) {
    notes.push(...notesFromLocalStorage);
    renderNotes();
  }
});

addNoteBtn.addEventListener("click", () => {
  const title = titleInput.value;
  const content = contentInput.value;
  const color = colorInput.value;
  const pinned = pinnedInput.checked;
  const date = dateInput.value;
  const tags = String(tagsInput.value)
    .split(",")
    .map((tag) => tag.trim());

  const note = {
    title,
    content,
    color,
    pinned,
    date,
    tags,
  };

  saveNote(note);
  renderNotes();
});

function saveNote(note) {
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.style.backgroundColor = note.color;
    noteElement.innerHTML = `
            <p>${note.tags}</p>
            <h2>${note.title}</h2>
            <p>${note.date}</p>
            <p>${note.content}</p>
        `;
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      notes.splice(notes.indexOf(note), 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    });

    noteElement.appendChild(deleteBtn);
    notesContainer.appendChild(noteElement);
  });
}
