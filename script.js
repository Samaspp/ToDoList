const inbox = document.getElementById("inbox");
const list = document.getElementById("list");
let previousTaskElement = "";

inbox.focus();
function addTask() {
  if (inbox.value === "") {
    alert("Invalid entry. Try again.");
  } else {
    const task = document.createElement("li");
    task.innerHTML = inbox.value;
    list.appendChild(task);

    const img = document.createElement("img");
    img.src = "images/icons8-edit-50.png";
    task.appendChild(img);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7"; //the into sign for deletion of tasks
    task.appendChild(span);
  }
  inbox.value = null;
  saveData();
}

inbox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

list.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      inbox.focus();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      inbox.focus();
    } else if (e.target.tagName === "IMG") {
      editTask(e.target.parentElement);
      saveData();
    }
  },
  false
);

function editTask(taskElement) {
  if (previousTaskElement === "") {
    //first time editing a task
    previousTaskElement = taskElement;
  } else {
    //already in the middle of editing a  task
    const xInput = previousTaskElement.querySelector("input");

    let text = xInput.value;
    if (xInput) {
      xInput.remove();
    }
    console.log("hello");
    previousTaskElement.textContent = text;

    const img = document.createElement("img");
    img.src = "images/icons8-edit-50.png";
    previousTaskElement.appendChild(img);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    previousTaskElement.appendChild(span);

    previousTaskElement = taskElement;
  }

  const xSpan = taskElement.querySelector("span");
  if (xSpan) {
    xSpan.remove();
  }

  const xImg = taskElement.querySelector("img");
  if (xImg) {
    xImg.remove();
  }

  let newTask = taskElement.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.id = "task";
  input.value = newTask;
  taskElement.innerHTML = "";
  taskElement.appendChild(input);
  const task = document.getElementById("task");
  task.focus();

  //editing happens here
  const span = document.createElement("span");
  span.innerHTML = "\u00d7";
  taskElement.appendChild(span);
  saveData();

  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const xInput = taskElement.querySelector("input");
      let text = xInput.value;
      if (xInput.value === "") {
        alert("Invalid entry. Try again.");
      } else {
        if (xInput) {
          xInput.remove();
        }

        taskElement.textContent = text;

        if (taskElement === previousTaskElement) {
          previousTaskElement = "";
          inbox.focus();
        }

        const img = document.createElement("img");
        img.src = "images/icons8-edit-50.png";
        taskElement.appendChild(img);

        const span = document.createElement("span");
        span.innerHTML = "\u00d7"; //the into sign for deletion of tasks
        taskElement.appendChild(span);
        saveData();
      }
    }
  });
}
function saveData() {
  localStorage.setItem("data", list.innerHTML);
}

function showTask() {
  list.innerHTML = localStorage.getItem("data");
}
showTask();

localStorage.clear();
