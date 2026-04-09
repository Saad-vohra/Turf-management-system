import React from "react";

import "./bookingCard.css";

const BookingCard = ({ booking }) => {

  const getStatusColor = (status) => {
    if (status === "CONFIRMED") return "green";
    if (status === "LOCKED") return "orange";
    if (status === "CANCELLED") return "red";
    return "gray";
  };

  return (
    <div className="booking-card">

      <div className="card-header">
        <h3>{booking.sport} Booking</h3>
        <span
          className="status"
          style={{ background: getStatusColor(booking.status) }}
        >
          {booking.status}
        </span>
      </div>

      <div className="card-body">

        <p><strong>📅 Date:</strong> {booking.date}</p>
        <p><strong>⏰ Slot:</strong> {booking.slot}</p>
        <p><strong>⏱ Duration:</strong> {booking.duration} hr</p>
        <p><strong>🏟 Court:</strong> {booking.courtType}</p>
        <p><strong>💰 Amount:</strong> ₹{booking.finalAmount || booking.amount}</p>

        <p className="payment">
          Payment: <span>{booking.paymentStatus}</span>
        </p>

      </div>

      <div className="card-actions">

        {booking.ticketPath && (
          <a
            href={`http://localhost:5000${booking.ticketPath}`}
            target="_blank"
            rel="noreferrer"
          >
            <button className="ticket-btn">View Ticket</button>
          </a>
        )}

      </div>

    </div>
  );
};

export default BookingCard;