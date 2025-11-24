import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import withLoader from "../hoc/withLoader";

const DetailsWithLoader = withLoader(({ book }) => (
  <div>
    <h2>{book.title}</h2>
    <p>Author: {book.author}</p>
    <p>Price: Rs.{book.price}</p>
    <p>{book.description}</p>
    <Link to="/home">Back</Link>
  </div>
));

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => {
      setBook(res.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <DetailsWithLoader loading={loading} book={book} />
  );
}
