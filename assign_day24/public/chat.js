// public/chat.js

// ---------- File upload logic ----------
const uploadForm = document.getElementById('uploadForm');
const uploadStatus = document.getElementById('uploadStatus');
const uploadBtn = document.getElementById('uploadBtn');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('file');
  if (!fileInput.files[0]) {
    uploadStatus.textContent = 'Please choose a PDF file.';
    uploadStatus.className = 'status error';
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  uploadBtn.disabled = true;
  uploadStatus.textContent = 'Uploading...';
  uploadStatus.className = 'status';

  try {
    const res = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const text = await res.text();

    if (!res.ok) {
      throw new Error(text || 'Upload failed');
    }

    uploadStatus.textContent = text;
    uploadStatus.className = 'status ok';
    fileInput.value = '';
  } catch (err) {
    uploadStatus.textContent = err.message;
    uploadStatus.className = 'status error';
  } finally {
    uploadBtn.disabled = false;
  }
});

// ---------- Chat logic with Socket.io ----------
const socket = io(); // connects to same origin

const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

const myId = Math.random().toString(36).slice(2); // simple local ID

// Append message to chat window
function addMessage({ id, message, timestamp }) {
  const div = document.createElement('div');
  div.classList.add('message');
  if (id === myId) {
    div.classList.add('self');
  }

  const time = new Date(timestamp).toLocaleTimeString();

  div.innerHTML = `
    <div class="meta">${id === myId ? 'You' : 'User ' + id.slice(0, 5)} · ${time}</div>
    <div class="text">${message}</div>
  `;

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// When we submit a chat message
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  socket.emit('chatMessage', { message, id: myId });
  messageInput.value = '';
});

// When we receive a chat message from the server
socket.on('chatMessage', (payload) => {
  // The server doesn't know our myId, so patch it here
  addMessage({
    id: payload.id || 'server',
    message: payload.message,
    timestamp: payload.timestamp || new Date().toISOString(),
  });
});
