const getEle = (id) => document.getElementById(id);
const addEle = (tag) => document.createElement(tag);
const getText = () => getEle("input-task").value.trim();
const setText = (value) => (getEle("input-task").value = value);

// const addClass = function(element) {
//   return function(className) {
//     return element.classList.add(className);
//   }
// };

const on = R.curry(function (eventType, element, fn) {
  element.addEventListener(eventType, fn);

  return function () {
    element.removeEventListener(eventType, fn);
  };
});

const addBtn = R.curry(function (tag, element) {
  element.innerHTML = tag;
  return element;
});

const addText = R.curry(function (value, element) {
  element.textContent = value;
  return element;
});

const addClass = R.curry(function (className, element) {
  element.classList.add(className);
  return element;
});

const append = R.curry(function (node, element) {
  element.appendChild(node);
  return element;
});

const clear = R.curry((element) => {
  let child = element.lastElementChild;
  if (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
  return element;
});

const updatePersistent = function (list) {
  return {
    get: function (storedName) {
      const storedList = localStorage.getItem(storedName);
      if (typeof storedList !== "string") return;
      const parsedList = JSON.parse(storedList);
      parsedList.forEach((task) => {
        const newTask = { id: task.id, content: task.content };
        list.push(newTask);
      });
    },
    set: function (storedName) {
      localStorage.setItem(storedName, JSON.stringify(list));
    },
  };
};
