import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">

        <Link className="navbar-brand" to="/">Product Dashboard</Link>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/" end className="nav-link">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add" className="nav-link">Add Product</NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
