const ToDoList = [];
updatePersistent(ToDoList).get("myToDoList");

function app(tasks, output, dispatch) {
  R.compose(append(view(tasks)), clear())(output);

  const stop = dispatch((e) => {
    stop(); //stop() to not add the empty string from add-task input

    if (e instanceof KeyboardEvent && e.key !== "Enter") {
      return;
    }

    const newTask = {
      id: ToDoList.length + 1,
      content: getText(), //get the input-text
    };
    ToDoList.push(newTask);
    updatePersistent(ToDoList).set("myToDoList");
    setText();

    app(ToDoList, output, dispatch);
  });
}

function view(tasks) {
  const el = addEle("ul");
  return tasks.length > 0
    ? R.pipe(...tasks.map((item) => append(task(item))))(el)
    : el;
}

function task({ content, id }) {
  const delBtn = R.compose(
    addClass("deleteTask"),
    addBtn('<i class="fa-solid fa-trash"></i>')
  )(addEle("button"));

  function handleDeleteEvent(e, id) {
    let target = e.currentTarget;
    console.log(content);
    for (let task in ToDoList) {
      if (ToDoList[task].id === id) {
        ToDoList.splice(task, 1);
        break;
      }
    }
    updatePersistent(ToDoList).set("myToDoList");
    target.parentElement.remove();
  }

  delBtn.addEventListener("click", (e) => handleDeleteEvent(e, id));

  const checkBtn = R.compose(
    addClass("checkTask"),
    addBtn('<i class="fa-solid fa-circle-check"></i>')
  )(addEle("button"));

  function handleCheckEvent(e) {
    this.parentElement.style.textDecoration = "line-through";
  }

  checkBtn.addEventListener("click", handleCheckEvent);

  const p = R.compose(addText(content))(addEle("p"));

  return R.compose(
    append(delBtn),
    append(checkBtn),
    append(p),
    addClass("task")
  )(addEle("li"));
}

const addButton = on("click", getEle("add-task"));
const submitKey = on("submit", getEle("add-task-container"));

app(ToDoList, getEle("task-container"), addButton);
app(ToDoList, getEle("task-container"), submitKey);

//Variables

// const addTask = document.getElementById('add-task');

// const taskContainer = document.getElementById('task-container');

// const inputTask = document.getElementById('input-task');

// addTask.addEventListener('click', function() {

//   let task = document.createElement('div');
//   task.classList.add('task');

//   let li = document.createElement('li');
//   li.textContent = `${inputTask.value}`;
//   task.appendChild(li);

//   let checkButton = document.createElement('button');
//   checkButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
//   checkButton.classList.add('checkTask');
//   task.appendChild(checkButton);

//   let deleteButton = document.createElement('button');
//   deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
//   deleteButton.classList.add('deleteTask');
//   task.appendChild(deleteButton);

//   if(inputTask.value === "") {

//     alert("Please enter a task");
//   } else {

//     taskContainer.appendChild(task);
//   }

//   inputTask.value = "";

//   checkButton.addEventListener('click', function() {

//     checkButton.parentElement.style.textDecoration = "line-through";
//   });

//   deleteButton.addEventListener('click', function(e) {

//     let target = e.target;
//     target.parentElement.parentElement.remove();
//   });

// });
