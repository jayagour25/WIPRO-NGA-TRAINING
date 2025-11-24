import { useEffect, useState } from "react";
import { api } from "../api";
import BookCard from "../components/BookCard";
import withLoader from "../hoc/withLoader";
import Message from "../renderprops/Message";

const BookListWithLoader = withLoader(({ books }) => (
  <div>
    {books.map((b) => (
      <BookCard key={b.id} book={b} />
    ))}
  </div>
));

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/books").then((res) => {
      setBooks(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>BookVerse Home</h1>

      <Message render={() => <p>Welcome reader!</p>} />

      <BookListWithLoader loading={loading} books={books} />
    </div>
  );
}
