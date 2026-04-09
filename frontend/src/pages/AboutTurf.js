import React from "react";
import { useNavigate } from "react-router-dom";

import "../components/aboutTurf.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import turfImg from "../assets/TURF.webp"; // use your image
import turfImg2 from "../assets/TURF_2.jpg";
import turfImg3 from "../assets/TURF_3.jpg"; // use your image



const AboutTurf = () => {

  const navigate = useNavigate();
  
    const goToNextPage = () => {
      navigate("/book-turf");
    };

  const turf = {
    name: "Green Arena Turf",
    location: "Chennai",
    rating: 4.5,
    description:
      "Green Arena Turf is a premium 5v5 Cricket and football ground with high-quality artificial grass, perfect lighting, and professional facilities. Ideal for matches, practice, and tournaments.",
    facilities: [
      "Floodlights",
      "Parking",
      "Washroom",
      "Drinking Water",
      "Changing Room"
    ],
    images: [turfImg, turfImg2, turfImg3],
    
    contact: {
      phone: "+91 9363874901",
      email: "support@greenarena.com"
    }
  };

  return (
    <div className="about-page">
      <Header />

      {/* HERO */}
      <div className="hero" style={{ backgroundImage: `url(${turfImg})` }}>
        <div className="hero-overlay">
          <h1>{turf.name}</h1>
          <p>{turf.location} • ⭐ {turf.rating}</p>
          <button className="book-btn" onClick={goToNextPage}>Book Now</button>
        </div>
      </div>

      <div className="about-container">

        {/* QUICK INFO */}
        <div className="info-bar">
          <div>⏰ 6 AM - 11 PM</div>
          <div>⚽ Football & Cricket</div>
          <div>📍 {turf.location}</div>
          <div>💰 ₹800-1000/hr</div>
        </div>

        {/* ABOUT */}
        <div className="section">
          <h2>About Turf</h2>
          <p>{turf.description}</p>
        </div>

        {/* FACILITIES */}
        <div className="section">
          <h2>Facilities</h2>
          <div className="facilities">
            {turf.facilities.map((item, i) => (
              <div key={i} className="facility-card">{item}</div>
            ))}
          </div>
        </div>

        {/* GALLERY */}
        <div className="section">
          <h2>Gallery</h2>
          <div className="gallery">
            {turf.images.map((img, i) => (
              <img key={i} src={img} alt="turf" />
            ))}
          </div>
        </div>

        {/* SLOTS */}
        <div className="section">
          <h2>Rules to Follow</h2>

          <div className="rules">
            <div className="rule-card">⚽ No outside shoes allowed</div>
            <div className="rule-card">🕒 Be on time for your slot</div>
            <div className="rule-card">🚫 No smoking or alcohol</div>
            <div className="rule-card">🧹 Keep the turf clean</div>
            <div className="rule-card">📢 Follow staff instructions</div>
          </div>
        </div>

        
        {/* CONTACT */}
        <div className="section">
          <h2>Contact</h2>
          <p>📞 {turf.contact.phone}</p>
          <p>📧 {turf.contact.email}</p>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default AboutTurf;