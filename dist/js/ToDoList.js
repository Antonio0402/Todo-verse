export default class ToDoList {
  constructor(list = []) {
    this._list = list;
  }

  get list() {
    return this._list;
  }

  set list(list) {
    this._list = list;
  }

  clearList() {
    this._list = [];
  }

  addTaskToList(task) {
    this._list.push(task);
  }

  removeTaskFromList(id) {
    const list = this._list;
    for (let i in list) {
      if (list[i]._id == id) {
        list.splice(i, 1);
        break;
      }
    }
  }
}
