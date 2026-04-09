import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-section">
          <h2>TurfZone</h2>
          <p>
            Book your favorite cricket turf easily. Manage bookings,
            tournaments, and matches in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/book">Book Turf</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📍 Ahmedabad, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉ turfzone@gmail.com</p>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {year} TurfZone | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;