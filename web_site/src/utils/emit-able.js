export default class EmitAble {
  _task = {};

  on(event, callback) {
    this._task[event] = this._task[event] || [];
    this._task[event].push(callback);
  }

  fire(event, payload) {
    const task = this._task[event] || [];
    task.forEach((callback) => callback(payload));
  }

  off(event, callback) {
    const task = this._task[event] || [];
    this._task[event] = task.filter((cb) => cb !== callback);
  }

  clear(event) {
    this._task[event] = null;
  }
}
