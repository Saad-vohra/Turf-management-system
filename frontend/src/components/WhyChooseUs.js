import React from "react";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <h2>Why Choose <span>Us?</span></h2>
      <p className="subtitle">
        We provide the best turf booking experience for players and teams.
      </p>

      <div className="why-cards">
        <div className="why-card">
          <span>⚽</span>
          <h3>Premium Turfs</h3>
          <p>
            High-quality, well-maintained turfs suitable for all sports.
          </p>
        </div>

        <div className="why-card">
          <span>⏰</span>
          <h3>Easy Slot Booking</h3>
          <p>
            Book your preferred time slot quickly with our simple interface.
          </p>
        </div>

        <div className="why-card">
          <span>💳</span>
          <h3>Secure Payments</h3>
          <p>
            Safe and secure payment methods for a worry-free booking.
          </p>
        </div>

        <div className="why-card">
          <span>📍</span>
          <h3>Prime Locations</h3>
          <p>
            Turfs located at easily accessible and popular sports locations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
