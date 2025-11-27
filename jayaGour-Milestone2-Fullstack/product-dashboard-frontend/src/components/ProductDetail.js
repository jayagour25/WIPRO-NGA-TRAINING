import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

function ProductDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{item.name}</h2>
      <p>Category: {item.category}</p>
      <p>Price: Rs. {item.price}</p>
      <p>{item.description}</p>
      <Link className="btn btn-secondary" to="/">Back</Link>
    </div>
  );
}

export default ProductDetail;
