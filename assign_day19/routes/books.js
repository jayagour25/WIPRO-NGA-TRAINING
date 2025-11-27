// routes/books.js
const express = require("express");
const { validationResult } = require("express-validator");
const {
  createBookValidation,
  updateBookValidation
} = require("../validators/bookValidator");

const router = express.Router();

// In-memory data store
let books = [
  { id: 1, title: "1984", author: "Orwell" },
  { id: 2, title: "The Alchemist", author: "Coelho" }
];

let nextId = 3;

// Helper to find book by ID
function findBookById(id) {
  return books.find((book) => book.id === id);
}

// GET /books - get all books
router.get("/", (req, res) => {
  res.json(books);
});

// GET /books/:id - get single book by ID (extended project)
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = findBookById(id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

// POST /books - add a new book (with validation)
router.post("/", createBookValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // validation failed
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author } = req.body;

  const newBook = {
    id: nextId++,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update book details (with validation)
router.put("/:id", updateBookValidation, (req, res, next) => {
  const id = Number(req.params.id);
  const book = findBookById(id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // validation failed
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author } = req.body;

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;

  res.json(book);
});

// DELETE /books/:id - delete a book
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const existingLength = books.length;

  books = books.filter((book) => book.id !== id);

  if (books.length === existingLength) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json({ message: "Book deleted successfully" });
});

module.exports = router;
