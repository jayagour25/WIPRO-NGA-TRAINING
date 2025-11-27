import React, { useState, useEffect } from "react";
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
      <h2>Product Detail</h2>
      <div className="card p-4">

        <h3>{item.name}</h3>
        <p><b>Category:</b> {item.category}</p>
        <p><b>Price:</b> Rs. {item.price}</p>
        <p><b>Description:</b> {item.description}</p>

        <Link className="btn btn-secondary mt-2" to="/">Back</Link>

      </div>
    </div>
  );
}

export default ProductDetail;
