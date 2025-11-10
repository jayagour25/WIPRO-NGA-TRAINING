import React, { useState } from 'react';
import TodoActions from '../actions/TodoActions';

export default function AddTodo() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      TodoActions.addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
