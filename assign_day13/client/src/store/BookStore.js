import Dispatcher from "../dispatcher/Dispatcher";

class BookStore {
  constructor() {
    this.books = [];
    this.listeners = [];

    Dispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_BOOK":
        this.books.push(action.payload);
        this.emitChange();
        break;
      default:
        break;
    }
  }

  getBooks() {
    return this.books;
  }

  onChange(listener) {
    this.listeners.push(listener);
  }

  emitChange() {
    this.listeners.forEach(listener => listener(this.books));
  }
}

// Dependency Injection → exporting store instance
const bookStoreInstance = new BookStore();
export default bookStoreInstance;
