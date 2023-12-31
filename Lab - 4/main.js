const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const colorInput = document.querySelector("#color");
const pinnedInput = document.querySelector("#pinned");
const dateInput = document.querySelector("#date");
const tagsInput = document.querySelector("#tags");

const clearBtn = document.querySelector("#clear");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#search");

const addNoteBtn = document.querySelector("#addNote");
const notesContainer = document.querySelector("#notesContainer");

const notes = [];

document.addEventListener("DOMContentLoaded", () => {
  const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"));
  if (notesFromLocalStorage) {
    notes.push(...notesFromLocalStorage);
    renderNotes(notes);

    const todayNotes = notes.filter((note) => {
      return note.date === new Date().toISOString().slice(0, 10);
    });
    if (todayNotes.length > 0) {
      notesTitlesString = todayNotes.map((note) => note.title).join(", ");
      alert(`Notes for today:\n${notesTitlesString}`);
    }
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  notes.length = 0;
  renderNotes(notes);
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
  renderNotes(notes);
});

function saveNote(note) {
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes(notes) {
  notesContainer.innerHTML = "";
  notes.sort(sortTrueFirst).forEach((note) => {
    notesContainer.appendChild(createNote(note));
  });
}

function createNote(note) {
  const noteElement = document.createElement("div");
  noteElement.style.marginTop = "10px";
  noteElement.style.backgroundColor = note.color;
  noteElement.innerHTML = `
            <p>${note.tags}</p>
            <h2>${note.title}</h2>
            <p>${note.date}</p>
            <p>${note.content}</p>
        `;

  const pinnedElement = document.createElement("input");
  pinnedElement.type = "checkbox";
  pinnedElement.checked = note.pinned;
  pinnedElement.addEventListener("change", () => {
    notes[notes.indexOf(note)].pinned = !note.pinned;
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes(notes);
  });
  noteElement.appendChild(pinnedElement);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    notes.splice(notes.indexOf(note), 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes(notes);
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
      renderNotes(notes);
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
      renderNotes(notes);
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
      renderNotes(notes);
    });
    todoElement.appendChild(deleteTodoBtn);
  });
  return todoElement;
}

searchBtn.addEventListener("click", () => {
  const searchValue = searchInput.value;
  const filteredNotes = notes.filter((note) => {
    return (
      note.title.includes(searchValue) ||
      note.content.includes(searchValue) ||
      note.tags.includes(searchValue) ||
      note.todos.some((todo) => todo.name.includes(searchValue))
    );
  });
  renderNotes(filteredNotes);
});

function sortTrueFirst(a, b) {
  return b.pinned - a.pinned;
}
