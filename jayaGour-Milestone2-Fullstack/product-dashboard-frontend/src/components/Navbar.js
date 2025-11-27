import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">Product Dashboard</Link>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" end to="/">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add">Add Product</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
