import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadProducts() {
    setLoading(true);
    const res = await api.get("/products");
    setProducts(res.data);
    setLoading(false);
  }

  async function addProduct(product) {
    const res = await api.post("/products", product);
    setProducts((prev) => [...prev, res.data]);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
