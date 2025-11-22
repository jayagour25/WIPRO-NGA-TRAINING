import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ProductCard from "./components/ProductCard";
import LoginForm from "./components/LoginForm";
import UserStatus from "./components/UserStatus";
import UserDetails from "./components/UserDetails";
import ResponsiveBox from "./components/ResponsiveBox";
import FormikLogin from "./components/FormikLogin";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>ShopNow Demo</h1>

        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
          <Link to="/formik">Formik Login</Link> |{" "}
          <Link to="/users/1">User Details</Link> |{" "}
          <Link to="/responsive">Responsive Box</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Product Listing</h2>
                <ProductCard title="Shoes" price={2000} discount={300} />
                <ProductCard title="Watch" price={1500} discount={100} />

                <h2>User Status</h2>
                <UserStatus userId={101} />
              </div>
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/formik" element={<FormikLogin />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/responsive" element={<ResponsiveBox />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
