// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// //import "./Ticket.css";

// export default function Ticket() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const booking = state?.booking;

//   if (!booking) {
//     return <p className="loading">No Ticket Found</p>;
//   }

//   return (
//     <div className="ticket-page">
//       <div className="ticket-card">
//         <h2>🎟 Turf Booking Ticket</h2>

//         <div className="ticket-row">
//           <span>Booking ID:</span>
//           <strong>{booking._id}</strong>
//         </div>

//         <div className="ticket-row">
//           <span>Name:</span>
//           <strong>{booking.name}</strong>
//         </div>

//         <div className="ticket-row">
//           <span>Date:</span>
//           <strong>{booking.date}</strong>
//         </div>

//         <div className="ticket-row">
//           <span>Time:</span>
//           <strong>{booking.time}</strong>
//         </div>

//         <div className="ticket-row">
//           <span>Duration:</span>
//           <strong>{booking.duration}</strong>
//         </div>

//         <div className="ticket-row">
//           <span>Amount Paid:</span>
//           <strong>₹{booking.amount}</strong>
//         </div>

//         <div className="status confirmed">
//           {booking.status}
//         </div>

//         {/* DOWNLOAD TICKET */}
//         <a
//           href={`http://localhost:5000${booking.ticketPath}`}
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button className="download-btn">
//             Download Ticket
//           </button>
//         </a>

//         <button className="home-btn" onClick={() => navigate("/")}>
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// //import "./Ticket.css";

// export default function Ticket() {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/bookings/${bookingId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         setBooking(res.data.booking);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTicket();
//   }, [bookingId]);

//   if (loading) return <p className="loading">Loading Ticket...</p>;
//   if (!booking) return <p className="loading">No Ticket Found</p>;

//   return (
//     <div className="ticket-page">
//       <div className="ticket-card">
//         <h2>🎟 Turf Booking Ticket</h2>

//         <p><b>Booking ID:</b> {booking._id}</p>
//         <p><b>Name:</b> {booking.customer.name}</p>
//         <p><b>Date:</b> {booking.date}</p>
//         <p><b>Slot:</b> {booking.slot}</p>
//         <p><b>Duration:</b> {booking.duration} hr</p>
//         <p><b>Amount:</b> ₹{booking.amount}</p>

//         <div className="status confirmed">
//           {booking.status}
//         </div>

//         <a
//           href={`http://localhost:5000${booking.ticketPath}`}
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button className="download-btn">
//             Download Ticket
//           </button>
//         </a>

//         <button onClick={() => navigate("/")}>Home</button>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Ticket.css";
// export default function Ticket() {

//   const { bookingId } = useParams();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/bookings/${bookingId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         // ✅ FIX: backend returns booking directly
//         setBooking(res.data);

//       } catch (err) {
//         console.error("Ticket fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (bookingId) {
//       fetchTicket();
//     }
//   }, [bookingId]);

//   // ⏳ Loading state
//   if (loading) return <p className="loading">Loading Ticket...</p>;

//   // ❌ No booking found
//   if (!booking) return <p className="loading">No Ticket Found</p>;

  

//   return (
//     <div className="ticket-page">
//       <div className="ticket-card">
//         <h2>🎟 Turf Booking Ticket</h2>

//         <hr />

//         <p><b>Booking ID:</b> {booking._id}</p>
//         <p><b>Name:</b> {booking.customer?.name || "N/A"}</p>
//         <p><b>Email:</b> {booking.customer?.email || "N/A"}</p>
//         <p><b>Phone:</b> {booking.customer?.phone || "N/A"}</p>

//         <p><b>Sport:</b> {booking.sport}</p>
//         <p><b>Date:</b> {booking.date}</p>
//         <p><b>Slot:</b> {booking.slot}</p>
//         <p><b>Duration:</b> {booking.duration} hr</p>
//         <p><b>Court Type:</b> {booking.courtType}</p>

//         <p>
//           <b>Umpire:</b> {booking.umpire ? "Yes" : "No"} |{" "}
//           <b>Scorecard:</b> {booking.scorecard ? "Yes" : "No"}
//         </p>

//         <p><b>Total Amount:</b> ₹{booking.finalAmount || booking.amount}</p>

//         <div className={`status ${booking.status === "CONFIRMED" ? "confirmed" : ""}`}>
//           {booking.status}
//         </div>

//         {/* 🎟 DOWNLOAD TICKET */}
//         {/* {booking.ticketPath ? (
//           <a
//             href={`http://localhost:5000${booking.ticketPath}`}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <button className="download-btn">
//               Download Ticket
//             </button>
//           </a>
//         ) : (
//           <p className="loading">Ticket not generated yet</p>
//         )} */}


// {booking.ticketPath ? (
//   <a
//     href={`http://localhost:5000${booking.ticketPath}`}
//     target="_blank"
//     rel="noreferrer"
//   >
//     <button className="download-btn">Download Ticket</button>
//   </a>
// ) : (
//   <p className="not-generated">Ticket not generated yet</p>
// )}



//         <br />

//         <button onClick={() => navigate("/")}>Home</button>
//       </div>
//     </div>
//   );
// }





// // src/pages/Ticket.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Ticket.css"; // optional styling
// import { QRCodeCanvas } from "qrcode.react";


// export default function Ticket() {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();

//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // MESAAGE TO DISPLAY
//   const [showMessage, setShowMessage] = useState(true);
//   useEffect(() => {
//   const timer = setTimeout(() => {
//     setShowMessage(false);
//   }, 4000); // 4 seconds (you can change)

//   return () => clearTimeout(timer);
// }, []);


//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/bookings/${bookingId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         setBooking(res.data);
//       } catch (error) {
//         console.error(error);
//         setBooking(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooking();
//   }, [bookingId]);

//   if (loading) return <p className="loading">Loading Ticket...</p>;
//   if (!booking) return <p className="loading">No Ticket Found</p>;

//   return (
//     <div className="ticket-page">

//        {showMessage && (
//   <div className="ticket-success-message">
//     ✅ <strong>Booking Confirmed!</strong>
//     <p>Your ticket has been sent to your registered email.</p>
//   </div>
// )}


//       <div className="ticket-card">
//         <h2>🎟 Turf Booking Ticket</h2>
//         <hr/>

//         <p><b>Booking ID:</b> {booking._id}</p>
//         <p><b>Name:</b> {booking.customer?.name}</p>
//         <p><b>Email:</b> {booking.customer?.email}</p>
//         <p><b>Phone:</b> {booking.customer?.phone}</p>
//         <p><b>Sport:</b> {booking.sport}</p>
//         <p><b>Date:</b> {booking.date}</p>
//         <p><b>Slot:</b> {booking.slot}</p>
//         <p><b>Duration:</b> {booking.duration} hr</p>
//         <p><b>Amount Paid:</b> ₹{booking.finalAmount || booking.amount}</p>

//         <div style={{ marginTop: "20px", textAlign: "center" }}>
//   <h4>Scan QR at Turf Entry</h4>

//   <QRCodeCanvas
//   value={booking._id}
//   size={180}
//   bgColor="#ffffff"
//   fgColor="#000000"
//   level="H"
//   includeMargin={true}
// />

// </div>

//         <div className={`status ${booking.status.toLowerCase()}`}>
//           {booking.status}
//         </div>

//         {/* ✅ Download Ticket Button */}
//         {booking.ticketPath ? (
//           <a
//             href={`http://localhost:5000${booking.ticketPath}`}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <button className="download-btn">Download Ticket</button>
//           </a>
//         ) : (
//           <p>Ticket not generated yet</p>
//         )}
//         <hr/>

//         <button id ="btn-to-home" onClick={() => navigate("/")}>Back to Home</button>
//       </div>
//     </div>
//   );
// }















// src/pages/Ticket.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Ticket.css";

export default function Ticket() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState("");

  // MESSAGE DISPLAY
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // FETCH BOOKING
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBooking(res.data);

        // ✅ GENERATE OTP (LAST 6 DIGITS OF ID)
        if (res.data._id) {
          const id = res.data._id;
          const last6 = id.slice(-6).toUpperCase(); // safe
          setOtp(last6);
        }

      } catch (error) {
        console.error(error);
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p className="loading">Loading Ticket...</p>;
  if (!booking) return <p className="loading">No Ticket Found</p>;

  return (
    <div className="ticket-page">

      {showMessage && (
        <div className="ticket-success-message">
          ✅ <strong>Booking Confirmed!</strong>
          <p>Your ticket has been sent to your registered email.</p>
        </div>
      )}

      <div className="ticket-card">
        <h2>🎟 Turf Booking Ticket</h2>
        <hr/>

        <p><b>Booking ID:</b> {booking._id}</p>
        <p><b>Name:</b> {booking.customer?.name}</p>
        <p><b>Email:</b> {booking.customer?.email}</p>
        <p><b>Phone:</b> {booking.customer?.phone}</p>
        <p><b>Sport:</b> {booking.sport}</p>
        <p><b>Date:</b> {booking.date}</p>
        <p><b>Slot:</b> {booking.slot}</p>
        <p><b>Duration:</b> {booking.duration} hr</p>
        <p><b>Amount Paid:</b> ₹{booking.finalAmount || booking.amount}</p>

        {/* ✅ OTP SECTION */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>🔐 Entry OTP</h3>
          <div style={{
            fontSize: "28px",
            fontWeight: "bold",
            letterSpacing: "5px",
            background: "#f4f4f4",
            padding: "10px",
            borderRadius: "8px",
            display: "inline-block"
          }}>
            {otp}
          </div>
          <p style={{ marginTop: "10px", color: "gray" }}>
            Show this OTP at turf entry
          </p>
        </div>

        <div className={`status ${booking.status.toLowerCase()}`}>
          {booking.status}
        </div>

        {/* DOWNLOAD BUTTON */}
        {booking.ticketPath ? (
          <a
            href={`http://localhost:5000${booking.ticketPath}`}
            target="_blank"
            rel="noreferrer"
          >
            <button className="download-btn">Download Ticket</button>
          </a>
        ) : (
          <p>Ticket not generated yet</p>
        )}

        <hr/>

        <button id="btn-to-home" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}