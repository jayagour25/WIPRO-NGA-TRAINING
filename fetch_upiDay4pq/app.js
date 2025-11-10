// ===============================
// Module Pattern Implementation
// ===============================
const AppModule = (function() {

  // Private API URLs
  const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
  const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';

  // Private DOM elements
  const postsContainer = document.getElementById('posts');
  const todosContainer = document.getElementById('todos');
  const postsError = document.getElementById('postsError');
  const todosError = document.getElementById('todosError');

  // ===============================
  // Private Methods
  // ===============================

  // Generic Fetch Function
  async function fetchData(url) {
    try {
      const response = await fetch(url);

      // Handle non-200 status
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Validate if data is an array
      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format");
      }

      return data;
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error; // Re-throw to be handled by caller
    }
  }

  // Render Posts
  function renderPosts(posts) {
    postsContainer.innerHTML = posts.slice(0, 5) // Limit to first 5 posts
      .map(post => `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `)
      .join('');
  }

  // Render Todos
  function renderTodos(todos) {
    todosContainer.innerHTML = todos.slice(0, 10) // Limit to first 10 todos
      .map(todo => `
        <div class="todo ${todo.completed ? 'completed' : ''}">
          <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
          ${todo.title}
        </div>
      `)
      .join('');
  }

  // Handle Errors
  function showError(element, message) {
    element.textContent = message;
  }

  // ===============================
  // Public Methods
  // ===============================
  return {
    async init() {
      try {
        // Fetch and display posts
        const posts = await fetchData(POSTS_API);
        renderPosts(posts);
      } catch (err) {
        showError(postsError, "⚠️ Failed to load posts. Please try again later.");
      }

      try {
        // Fetch and display todos
        const todos = await fetchData(TODOS_API);
        renderTodos(todos);
      } catch (err) {
        showError(todosError, "⚠️ Failed to load todos. Please try again later.");
      }
    }
  };

})();

// Initialize App
document.addEventListener('DOMContentLoaded', AppModule.init);
