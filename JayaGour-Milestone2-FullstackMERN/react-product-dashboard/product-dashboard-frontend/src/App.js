import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import AddProductForm from "./components/AddProductForm";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/add" element={<AddProductForm />} />
        </Routes>

      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
