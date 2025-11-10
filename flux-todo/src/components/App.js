import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoStore from '../stores/TodoStore';

function App() {
  const [todos, setTodos] = useState(TodoStore.getAll());

  useEffect(() => {
    const onChange = () => setTodos([...TodoStore.getAll()]);
    TodoStore.addChangeListener(onChange);
    return () => TodoStore.removeChangeListener(onChange);
  }, []);

  return (
    <div>
      <h1>Flux Todo App</h1>
      <AddTodo />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
