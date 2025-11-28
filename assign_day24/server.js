// server.js
const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ---------- 1. Ensure uploads folder exists ----------
const UPLOADS_FOLDER = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER);
}

// ---------- 2. Multer config for PDF uploads ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    // sanitize & make filename unique
    const timestamp = Date.now();
    const originalName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_.-]/g, ''); // basic sanitization

    cb(null, `${timestamp}_${originalName}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ---------- 3. Middlewares ----------
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files at /materials/<filename>
app.use('/materials', express.static(UPLOADS_FOLDER));

// ---------- 4. Routes ----------

// Home page (upload form + chat UI)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// File upload endpoint: POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded or invalid file type.');
  }

  const fileName = req.file.filename;
  res.send(`File uploaded successfully: ${fileName}`);
});

// ---------- 5. Socket.io real-time chat ----------
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // When a client sends a message
  socket.on('chatMessage', (data) => {
    // Broadcast to everyone (including sender)
    io.emit('chatMessage', {
      id: socket.id,
      message: data.message,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ---------- 6. Start server ----------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
