const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const colorInput = document.querySelector("#color");
const pinnedInput = document.querySelector("#pinned");
const dateInput = document.querySelector("#date");
const tagsInput = document.querySelector("#tags");

const clearBtn = document.querySelector("#clear");
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

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  notes.length = 0;
  renderNotes();
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
  const todos = [];

  const note = {
    title,
    content,
    color,
    pinned,
    date,
    tags,
    todos,
  };

  saveNote(note);
  renderNotes();
});

function saveNote(note) {
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    notesContainer.appendChild(createNote(note));
  });
}

function createNote(note) {
  const noteElement = document.createElement("div");
  noteElement.classList.add("note");
  noteElement.style.backgroundColor = note.color;
  noteElement.innerHTML = `
            <p>${note.tags}</p>
            <h2>${note.title}</h2>
            <p>${note.date}</p>
            <p>${note.content}</p>
            <p>${note.pinned ? "pinned" : ""}</p>
        `;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    notes.splice(notes.indexOf(note), 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
  });

  const todoElement = document.createElement("div");
  todoElement.textContent = "Todo:";
  const addTodoBtn = document.createElement("button");
  addTodoBtn.textContent = "Add todo";
  addTodoBtn.addEventListener("click", () => {
    const todo = prompt("Enter todo");
    if (todo) {
      note.todos.push({ name: todo, checked: false });
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    }
  });

  todoElement.appendChild(createTodos(note));

  todoElement.appendChild(addTodoBtn);

  noteElement.appendChild(todoElement);
  noteElement.appendChild(deleteBtn);

  return noteElement;
}

function createTodos(note) {
  const todoElement = document.createElement("div");
  note.todos.forEach((todo) => {
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.checked;
    todoElement.appendChild(todoCheckbox);
    todoCheckbox.addEventListener("change", () => {
      todo.checked = !todo.checked;
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    });

    const contentElement = document.createElement("span");
    contentElement.textContent = todo.name;
    if (todo.checked) {
      contentElement.style.textDecoration = "line-through";
    }
    todoElement.appendChild(contentElement);

    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.textContent = "Delete";
    deleteTodoBtn.addEventListener("click", () => {
      note.todos.splice(note.todos.indexOf(todo), 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    });
    todoElement.appendChild(deleteTodoBtn);
  });
  return todoElement;
}
