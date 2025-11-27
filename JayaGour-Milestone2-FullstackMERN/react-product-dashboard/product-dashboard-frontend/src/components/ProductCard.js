import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card p-3 h-100">

        <h5>{product.name}</h5>
        <p>Category: {product.category}</p>
        <p>Price: Rs. {product.price}</p>
        <p>{product.description}</p>

        <Link className="btn btn-sm btn-primary" to={`/products/${product.id}`}>
          View Details
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;
