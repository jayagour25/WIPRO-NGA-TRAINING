import Dispatcher from "../dispatcher/Dispatcher";

export const addBook = (book) => {
  Dispatcher.dispatch({
    type: "ADD_BOOK",
    payload: book
  });
};
