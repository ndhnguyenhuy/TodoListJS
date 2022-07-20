const input = document.querySelector("#input");
const iconPlus = document.querySelector(".icon");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
// Event Listeners
document.addEventListener("DOMContentLoaded", getTodo);
iconPlus.addEventListener("click", createItem);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
input.addEventListener("keypress", enterCreateTodo);
function enterCreateTodo(e) {
  if (e.which === 13) {
    createItem();
  }
}
function createItem() {
  if (!(input.value === "")) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = input.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to LocalStorage
    saveLocalTodo(input.value);
    // check mark button
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="icon fa-solid fa-check"></i>';
    checkBtn.classList.add("check-btn");
    todoDiv.appendChild(checkBtn);
    // delete mark button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="icon fa-solid fa-x"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);
    //   append to list
    todoList.appendChild(todoDiv);
    input.value = "";
  }
}
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("down");
    removeTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;

    todo.classList.toggle("check");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complete":
        if (todo.classList.contains("check")) {
          todo.style.display = "block";
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncomplete":
        if (!todo.classList.contains("check")) {
          todo.style.display = "block";
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodo() {
  console.log("hello");
  let todos;
  //

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to LocalStorage

    // check mark button
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="icon fa-solid fa-check"></i>';
    checkBtn.classList.add("check-btn");
    todoDiv.appendChild(checkBtn);
    // delete mark button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="icon fa-solid fa-x"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);
    //   append to list
    todoList.appendChild(todoDiv);
  });
}
function removeTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
