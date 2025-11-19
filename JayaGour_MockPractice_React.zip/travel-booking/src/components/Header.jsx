import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">TravelX</div>

        <nav>
          <Link to="/" className={pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/packages" className={pathname === "/packages" ? "active" : ""}>Packages</Link>
          <Link to="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link>
          <Link to="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
