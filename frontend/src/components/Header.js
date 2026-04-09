import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // navigate("/");
    navigate("/", { replace: true });
  };

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo">
        🏟️ Turf<span>Book</span>
      </div>

      {/* NAV LINKS */}
      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/book-turf">Book Turf</Link>
        <Link to="/My-Bookings">My Bookings</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* USER ACTION */}
      <div className="header-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
