import ToDoList from "./ToDoList.js";
import ToDoTask from "./ToDoTask.js";

const toDoList = new ToDoList();

//Launch app

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  const taskEntryForm = document.getElementById("task-entry-form");
  taskEntryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    processSubmission();
  });

  const clearTasks = document.getElementById("clear-tasks");
  clearTasks.addEventListener("click", () => {
    const list = toDoList.list;
    if (list.length) {
      const confirmed = confirm(
        "Are you sure you want to clear the entire list?"
      );
      if (confirmed) {
        toDoList.clearList();
        updatePersistentData(list);
        refreshThePage();
      }
    }
  });

  //Procedural
  loadListObject();
  refreshThePage();
};

const refreshThePage = () => {
  clearListDisplay();
  renderList();
  clearTaskEntryField();
  setFocusOnTaskEntry();
};

const loadListObject = () => {
  const storedList = localStorage.getItem("myToDoList");
  if (typeof storedList !== "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList.forEach((task) => {
    const newToDoTask = createNewTask(task._id, task._task);
    toDoList.addTaskToList(newToDoTask);
  });
};

const processSubmission = () => {
  const newEntryTask = document.getElementById("new-task").value.trim();
  if (!newEntryTask.length) {
    return;
  }

  const nextTaskId = calcNextTaskId();
  const newTask = createNewTask(nextTaskId, newEntryTask);
  toDoList.addTaskToList(newTask);
  updatePersistentData(toDoList.list);
  updateScreenReaderConfirmation(newEntryTask, "added");
  refreshThePage();
};

const calcNextTaskId = () => {
  let nextTaskId = 1;
  const list = toDoList.list;
  if (list.length > 0) {
    nextTaskId = list[list.length - 1].Id + 1;
  }
  return nextTaskId;
};

const createNewTask = (taskId, taskText) => {
  const task = new ToDoTask();
  task.Id = taskId;
  task.Task = taskText;
  return task;
};

const updatePersistentData = (listArray) => {
  localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

const updateScreenReaderConfirmation = (newEntryTask, actionVerb) => {
  document.getElementById(
    "confirmation"
  ).textContent = `${newEntryTask} ${actionVerb}.`;
};



const clearListDisplay = () => {
  const parentElement = document.getElementById("list-tasks");
  let child = parentElement.lastElementChild;

  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const renderList = () => {
  const list = toDoList.list;
  list.forEach((task) => {
    buildListTask(task);
  });
};

const buildListTask = (task) => {
  const div = document.createElement("div");
  div.classList.add("task");

  const label = document.createElement("label");
  label.htmlFor = task.Id;
  label.textContent = task.Task;
  label.style.pointerEvents = "none";
  div.appendChild(label);

  let checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  checkButton.classList.add("check-task");
  checkButton.tabIndex = 0;
  div.appendChild(checkButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-task");
  deleteButton.id = task.Id;
  deleteButton.tabIndex = 0;
  div.appendChild(deleteButton);

  const taskContainer = document.getElementById("list-tasks");
  taskContainer.appendChild(div);

  checkButton.addEventListener("click", function () {
    console.log(checkButton.previousSibling);
    checkButton.previousSibling.classList.toggle("checked");
  });

  deleteButton.addEventListener("click", function (e) {
    e.stopPropagation();
    toDoList.removeTaskFromList(deleteButton.id);
    updatePersistentData(toDoList.list);
    const removedText = document.getElementById(deleteButton.id).previousSibling
      .previousSibling.textContent;
    updateScreenReaderConfirmation(removedText, "removed from list.");
    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

const clearTaskEntryField = () => {
  document.getElementById("new-task").value = "";
};

const setFocusOnTaskEntry = () => {
  document.getElementById("new-task").focus();
};


