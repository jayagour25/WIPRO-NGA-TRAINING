import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    }
    setLoading(false);
  }

  async function addProduct(product) {
    setLoading(true);
    try {
      const res = await api.post("/products", product);
      setProducts((prev) => [...prev, res.data]);
    } catch (err) {
      setError("Failed to add product");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
