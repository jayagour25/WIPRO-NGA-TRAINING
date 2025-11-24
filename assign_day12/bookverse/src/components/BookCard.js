import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 15, margin: 10 }}>
      <h3>{book.title}</h3>
      <p>By {book.author}</p>
      <p>Rs. {book.price}</p>
      <Link to={`/book/${book.id}`}>View Details</Link>
    </div>
  );
}
