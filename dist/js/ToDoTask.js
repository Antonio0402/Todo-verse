export default class ToDoTask {
  constructor(id = null, task = null) {
    this._id = id;
    this._task = task;
  }

  get Id() {
    return this._id;
  }

  set Id(id) {
    this._id = id;
  }

  get Task() {
    return this._task;
  }

  set Task(task) {
    this._task = task;
  }
}
