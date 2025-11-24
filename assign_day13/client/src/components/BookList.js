import { useEffect, useState } from "react";
import BookStore from "../store/BookStore";

export default function BookList() {
  const [books, setBooks] = useState(BookStore.getBooks());

  useEffect(() => {
    BookStore.onChange((updatedBooks) => {
      setBooks(updatedBooks);
    });
  }, []);

  return (
    <div>
      <h2>Book Collection</h2>
      {books.map((b, i) => (
        <div key={i}>
          <strong>{b.title}</strong> by {b.author} — ${b.price}
        </div>
      ))}
    </div>
  );
}
