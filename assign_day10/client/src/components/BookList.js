import { useState } from "react";
import BookCard from "./BookCard";

export default function BookList() {
  const [view, setView] = useState("grid"); // "grid" or "list"
  const [search, setSearch] = useState("");

  const books = [
    { title: "Atomic Habits", author: "James Clear", price: 499 },
    { title: "Ikigai", author: "Héctor García", price: 299 },
    { title: "Deep Work", author: "Cal Newport", price: 399 },
    { title: "Psychology of Money", author: "Morgan Housel", price: 299 },
  ];

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Featured Books</h2>

      {/* Search Box — Controlled Component */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      {/* View Toggle Buttons */}
      <div>
        <button onClick={() => setView("grid")}>Grid View</button>
        <button onClick={() => setView("list")}>List View</button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: view === "grid" ? "row" : "column",
          flexWrap: "wrap",
        }}
      >
        {filteredBooks.map((book, index) => (
          <BookCard key={index} {...book} view={view} />
        ))}
      </div>
    </div>
  );
}
