import AppDispatcher from '../dispatcher/dispatcher';

const TodoActions = {
  addTodo(text) {
    AppDispatcher.dispatch({
      type: "ADD_TODO",
      payload: text
    });
  }
};

export default TodoActions;
