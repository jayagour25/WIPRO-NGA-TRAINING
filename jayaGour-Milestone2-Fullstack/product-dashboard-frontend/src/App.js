import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";

const ProductDetail = lazy(() => import("./components/ProductDetail"));

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Navbar />

        <Suspense fallback={<p>Loading page...</p>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/add" element={<AddProductForm />} />
          </Routes>
        </Suspense>

      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
