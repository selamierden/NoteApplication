var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var currentUserName = currentUser[0].username;

function writeCurrentUser(){
    var welcomeMessageSpan = document.getElementById("isim");
    welcomeMessageSpan.innerHTML = currentUserName;
}

const settingsIcon = document.querySelector(".settings-icon");
const settingsMenu = document.querySelector(".settings-menu");

settingsIcon.addEventListener("click", () => {
  settingsMenu.style.display =
    settingsMenu.style.display === "none" ? "block" : "none";
});

const deleteAccountBtn = document.getElementById("deleteAccountBtn");
const forProgrammersBtn = document.getElementById("forProgrammersBtn");
const forClassicBtn = document.getElementById("forClassicBtn");

deleteAccountBtn.addEventListener("click", () => {
  const users = JSON.parse(localStorage.getItem("users"));
  const filteredUsers = users.filter(
    (user) => user.username !== currentUserName
  );
  localStorage.setItem("users", JSON.stringify(filteredUsers));

  console.log("Hesap silindi");

  localStorage.removeItem(currentUserName + "userNotes");
  localStorage.removeItem(currentUserName + "deletedNotes");

  localStorage.setItem("currentUser", []);

  window.location.href = "index.html";
});

forProgrammersBtn.addEventListener("click", () => {
  window.location.href = "engineer.html";
});

forClassicBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

const form = document.getElementById("form");
const input = document.getElementById("input");
const div1 = document.getElementById("div1");
let deletebtn;
let chbox;


const addHTML = (todo) => {
  const todoLeft = document.createElement("div");
  todoLeft.classList.add("div3");

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("div2");
  todoDiv.style.border = "solid 1px"
  todoDiv.style.margin = "2px"
  todoDiv.style.borderRadius = "4px";
  todoDiv.style.overflowY = "auto"

  const todoCB = document.createElement("input");
  todoCB.classList.add("todo_cb");
  todoCB.type = "checkbox";
  todoCB.checked = todo.isOK;
  todoCB.style.width = "15px"
  todoCB.style.height = "20px"
  todoCB.style.margin = "3px"

  const todotext = document.createElement("span");
  todotext.textContent = todo.text;

  todoLeft.appendChild(todoCB);
  todoLeft.appendChild(todotext);

  const todoRight = document.createElement("div");
  todoRight.classList.add("div4");

  const deleteBTN = document.createElement("button");
  deleteBTN.classList.add("todo_delete");
  deleteBTN.textContent = "Sil";
  deleteBTN.style.margin = "3px";
  deleteBTN.style.backgroundColor = "red";
  deleteBTN.style.color = "white";
  deleteBTN.style.border = "none"

  todoRight.appendChild(deleteBTN);

  todoDiv.appendChild(todoLeft);
  todoDiv.appendChild(todoRight);

  div1.appendChild(todoDiv);
};

const startConf = () => {
  const todos = JSON.parse(localStorage.getItem(currentUserName + "todos"));
  if (!todos) {
    localStorage.setItem(currentUserName + "todos", JSON.stringify([]));
  } else {
    todos.forEach((todo) => {
      addHTML(todo);
    });
    deletebtn = document.querySelectorAll(".todo_delete");
    chbox = document.querySelectorAll(".todo_cb");
  }
};

startConf();

const addTodo = (e) => {
  e.preventDefault();

  inpval = input.value;

  const todo = {
    text: inpval,
    isOK: false,
  };

  const todos = JSON.parse(localStorage.getItem(currentUserName + "todos"));
  todos.push(todo);
  localStorage.setItem(currentUserName + "todos", JSON.stringify(todos));

  addHTML(todo);

  form.reset();
};

form.addEventListener("submit", addTodo);

const deleteToDo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem(currentUserName + "todos"));
  todos = todos.filter((td) => td.text != text);
  localStorage.setItem(currentUserName + "todos", JSON.stringify(todos));
  todo.remove();
};

const comptodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  let todos = JSON.parse(localStorage.getItem( currentUserName + "todos"));
  todos.forEach((td) => {
    if (td.text === text) td.isOK = !td.isOK;
  });

  localStorage.setItem(currentUserName + "todos", JSON.stringify(todos));
};

chbox.forEach((btn) => btn.addEventListener("click", comptodo));
deletebtn.forEach((btn) => btn.addEventListener("click", deleteToDo));

window.onload = function(){
    writeCurrentUser()
}
