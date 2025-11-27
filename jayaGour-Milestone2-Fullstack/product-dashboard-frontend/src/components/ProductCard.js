import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card p-3">
        <h4>{product.name}</h4>
        <p>Category: {product.category}</p>
        <p>Price: Rs. {product.price}</p>
        <Link className="btn btn-primary" to={`/products/${product.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
