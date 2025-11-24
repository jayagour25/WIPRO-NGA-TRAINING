import React, { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import ProductCard from "../components/ProductCard";

export default function ProductSection() {
  const [broken, setBroken] = useState(false);
  const product = broken ? null : { name: "Pro Package", price: 29 };

  return (
    <div className="container mt-5">
      <h2>Error Boundary Demo</h2>

      <button className="btn btn-danger mb-3" onClick={() => setBroken(true)}>
        Break Product Card
      </button>

      <ErrorBoundary>
        <ProductCard product={product} />
      </ErrorBoundary>
    </div>
  );
}
