import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

function ProductList() {
  const { products, loading } = useContext(ProductContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Product Catalog</h2>
      <div className="row">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
