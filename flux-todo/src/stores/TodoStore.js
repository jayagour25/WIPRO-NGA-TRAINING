import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';

let todos = [];

class TodoStore extends EventEmitter {
  getAll() {
    return todos;
  }

  addChangeListener(callback) {
    this.on('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  emitChange() {
    this.emit('change');
  }

  handleActions(action) {
    switch (action.type) {
      case "ADD_TODO":
        todos.push(action.payload);
        this.emitChange();
        break;
      default:
        // no default
    }
  }
}

const todoStore = new TodoStore();
AppDispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
