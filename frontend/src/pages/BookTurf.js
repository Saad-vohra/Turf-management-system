// // import React from "react";
// // import "./BookTurf.css";

// // const BookTurf = () => {
// //   return (
// //     <div className="book-turf-page">

// //       {/* TOP SECTION */}
// //       <div className="top-container">
// //         {/* LEFT */}
// //         <div className="map-card">
// //           <h3>Turfs Up Kothanur</h3>
// //           <p>Near St. Mary's Catholic Church, K. Narayanapura cross, Bangalore</p>
// //           <a
// //             href="https://maps.app.goo.gl/TrVonKDRH84uT4za8"
// //             target="_blank"
// //             rel="noreferrer"
// //           >
// //             View on Map
// //           </a>

// //           <iframe
// //             title="map"
// //             src="https://maps.google.com/maps?q=Kothanur%20Bangalore&t=&z=15&ie=UTF8&iwloc=&output=embed"
// //           />
// //         </div>

// //         {/* RIGHT */}
// //         <div className="booking-card">
// //           <input type="date" />
// //           <select>
// //             <option>Duration</option>
// //             <option>1 Hour</option>
// //             <option>2 Hours</option>
// //             <option>3 Hours</option>
// //             <option>4 Hours</option>
// //             <option>5 Hours</option>
// //             <option>6 Hours</option>
// //           </select>

// //           <select>
// //             <option>Choose Court</option>
// //             <option>5v5</option>
// //             <option>7v7</option>
// //           </select>

// //           <button>Book Turf</button>
// //         </div>
// //       </div>

//       // {/* BOTTOM SECTION */}
//       // <div className="bottom-container">
//       //   {/* RULES */}
//       //   <div className="info-box">
//       //     <h4>Rules to follow</h4>
//       //     <ul>
//       //       <li>Arrive 15 mins prior to your booked time.</li>
//       //       <li>Extra time will not be given.</li>
//       //       <li>Boots are recommended.</li>
//       //       <li>We are not responsible for losses.</li>
//       //       <li>Smoking & alcohol strictly prohibited.</li>
//       //     </ul>
//       //   </div>

//       //   {/* CONTACT */}
//       //   <div className="info-box">
//       //     <h4>Contact</h4>
//       //     <p>📞 +91 9876543210</p>
//       //     <p>📞 +91 9876543210</p>
//       //     <p>✉️ jerseyturf@gmail.com</p>
//       //   </div>

//       //   {/* AVAILABLE FOR */}
//       //   <div className="info-box">
//       //     <h4>Available For</h4>
//       //     <p>⚽ Football</p>
//       //     <p>🏏 Cricket</p>
//       //   </div>

//       //   {/* FACILITIES */}
//       //   <div className="info-box">
//       //     <h4>Facilities</h4>
//       //     <p>🚗 Parking Area</p>
//       //     <p>🚻 Restrooms</p>
//       //     <p>🩹 First Aid</p>
//       //   </div>
//       // </div>
// //     </div>
// //   );
// // };

// // export default BookTurf;

// // import React, { useState } from "react";
// // import "./BookTurf.css";

// // const timeSlots = [
// //   "6:00 AM","7:00 AM","8:00 AM","9:00 AM",
// //   "10:00 AM","11:00 AM","12:00 PM",
// //   "1:00 PM","2:00 PM","3:00 PM",
// //   "4:00 PM","5:00 PM","6:00 PM",
// // ];

// // const bookedSlots = ["9:00 AM", "2:00 PM"];

// // const courtPrices = {
// //   "5v5": 1200,
// //   "7v7": 1800,
// // };

// // const BookTurf = () => {
// //   const [date, setDate] = useState("");
// //   const [duration, setDuration] = useState("");
// //   const [court, setCourt] = useState("");
// //   const [selectedSlot, setSelectedSlot] = useState("");
// //   const [sport, setSport] = useState("");
// //   const [showForm, setShowForm] = useState(false);

// //   const [userData, setUserData] = useState({
// //     name: "",
// //     phone: "",
// //     email: "",
// //   });

// //   const getEndTime = () => {
// //     const startIndex = timeSlots.indexOf(selectedSlot);
// //     return timeSlots[startIndex + Number(duration)] || "";
// //   };

// //   const totalPrice =
// //     duration && court ? duration * courtPrices[court] : 0;

// //   const handleChange = (e) => {
// //     setUserData({ ...userData, [e.target.name]: e.target.value });
// //   };

// //   return (
// //     <div className="book-turf-page">

// //       {/* TOP SECTION */}
// //       <div className="top-container">

// //         <div className="map-card">
// //           <h3>Turfs Up Kothanur</h3>
// //           <p>Near St. Mary's Catholic Church, Bangalore</p>
// //           <iframe
// //             title="map"
// //             src="https://maps.google.com/maps?q=Kothanur%20Bangalore&output=embed"
// //           />
// //         </div>

// //         <div className="booking-card">
// //           <input type="date" onChange={(e) => setDate(e.target.value)} />

// //           <select onChange={(e) => {
// //             setDuration(e.target.value);
// //             setSelectedSlot("");
// //           }}>
// //             <option value="">Duration</option>
// //             {[1,2,3,4,5,6].map(hr => (
// //               <option key={hr} value={hr}>{hr} Hour</option>
// //             ))}
// //           </select>

// //           <select onChange={(e) => setCourt(e.target.value)}>
// //             <option value="">Choose Court</option>
// //             <option value="5v5">5v5</option>
// //             <option value="7v7">7v7</option>
// //           </select>

// //           <button
// //             disabled={!date || !duration || !court || !selectedSlot}
// //             onClick={() => setShowForm(true)}
// //           >
// //             Book Turf
// //           </button>
// //         </div>
// //       </div>

// //       {/* SLOT SECTION */}
// //       {duration && (
// //         <div className="slot-section">
// //           <h3>Available Slots</h3>

// //           <div className="slot-grid">
// //             {timeSlots.map((slot, index) => {
// //               const disabled =
// //                 bookedSlots.includes(slot) ||
// //                 index + Number(duration) > timeSlots.length;

// //               return (
// //                 <div
// //                   key={slot}
// //                   className={`slot 
// //                     ${disabled ? "booked" : "available"}
// //                     ${selectedSlot === slot ? "selected" : ""}
// //                   `}
// //                   onClick={() => !disabled && setSelectedSlot(slot)}
// //                 >
// //                   {slot}
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       )}

// //       {/* BOOKING FORM MODAL */}
// //       {showForm && (
// //         <div className="modal-overlay">
// //           <div className="modal-box">
// //             <h3>Booking Details</h3>

// //             <input
// //               type="text"
// //               placeholder="Full Name"
// //               name="name"
// //               onChange={handleChange}
// //             />

// //             <input
// //               type="tel"
// //               placeholder="Phone Number"
// //               name="phone"
// //               onChange={handleChange}
// //             />

// //             <input
// //               type="email"
// //               placeholder="Email"
// //               name="email"
// //               onChange={handleChange}
// //             />

// //             {/* SPORT CATEGORY */}
// //             <select onChange={(e) => setSport(e.target.value)}>
// //               <option value="">Select Sport</option>
// //               <option value="Football">Football</option>
// //               <option value="Cricket">Cricket</option>
// //             </select>

// //             <div className="summary">
// //               <p><b>Sport:</b> {sport}</p>
// //               <p><b>Date:</b> {date}</p>
// //               <p><b>Time:</b> {selectedSlot} - {getEndTime()}</p>
// //               <p><b>Duration:</b> {duration} Hour(s)</p>
// //               <p><b>Court:</b> {court}</p>
// //               <p className="price">Amount: ₹{totalPrice}</p>
// //             </div>

// //             <div className="modal-actions">
// //               <button className="cancel" onClick={() => setShowForm(false)}>
// //                 Cancel
// //               </button>
// //               <button className="pay">
// //                 Proceed to Payment
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   );
// // };

// // export default BookTurf;



// import React, { useState } from "react";
// import "./BookTurf.css";

// const timeSlots = [
//   "6:00 AM","7:00 AM","8:00 AM","9:00 AM",
//   "10:00 AM","11:00 AM","12:00 PM",
//   "1:00 PM","2:00 PM","3:00 PM",
//   "4:00 PM","5:00 PM","6:00 PM",
// ];

// const bookedSlots = ["9:00 AM", "2:00 PM"];

// const courtPrices = {
//   "5v5": 1200,
//   "7v7": 1800,
// };

// const BookTurf = () => {
//   const [date, setDate] = useState("");
//   const [duration, setDuration] = useState("");
//   const [court, setCourt] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState("");
//   const [sport, setSport] = useState("");

//   const [umpire, setUmpire] = useState("no");
//   const [scorecard, setScorecard] = useState("no");

//   const [showForm, setShowForm] = useState(false);

//   const [userData, setUserData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//   });

//   const getEndTime = () => {
//     if (!selectedSlot || !duration) return "";
//     const startIndex = timeSlots.indexOf(selectedSlot);
//     return timeSlots[startIndex + Number(duration)] || "";
//   };

//   // BASE PRICE
//   let totalPrice =
//     duration && court ? duration * courtPrices[court] : 0;

//   // CRICKET EXTRAS
//   if (sport === "Cricket") {
//     if (umpire === "yes") totalPrice += duration * 50;
//     if (scorecard === "yes") totalPrice += 20;
//   }

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="book-turf-page">

//       {/* TOP */}
//       <div className="top-container">
//         <div className="map-card">
//           <h3>Turfs Up Kothanur</h3>
//           <p>Bangalore</p>
//           <iframe
//             title="map"
//             src="https://maps.google.com/maps?q=Kothanur%20Bangalore&output=embed"
//           />
//         </div>

//         <div className="booking-card">
//           <input type="date" onChange={(e) => setDate(e.target.value)} />

//           <select onChange={(e) => {
//             setDuration(e.target.value);
//             setSelectedSlot("");
//           }}>
//             <option value="">Duration</option>
//             {[1,2,3,4,5].map(hr => (
//               <option key={hr} value={hr}>{hr} Hour</option>
//             ))}
//           </select>

//           <select onChange={(e) => setCourt(e.target.value)}>
//             <option value="">Choose Court</option>
//             <option value="5v5">5v5</option>
//             <option value="7v7">7v7</option>
//           </select>

//           <button
//             disabled={!date || !duration || !court || !selectedSlot}
//             onClick={() => setShowForm(true)}
//           >
//             Book Turf
//           </button>
//         </div>
//       </div>

//       {/* SLOTS */}
//       {duration && (
//         <div className="slot-section">
//           <h3>Available Slots</h3>
//           <div className="slot-grid">
//             {timeSlots.map((slot, index) => {
//               const disabled =
//                 bookedSlots.includes(slot) ||
//                 index + Number(duration) > timeSlots.length;

//               return (
//                 <div
//                   key={slot}
//                   className={`slot ${disabled ? "booked" : ""} ${
//                     selectedSlot === slot ? "selected" : ""
//                   }`}
//                   onClick={() => !disabled && setSelectedSlot(slot)}
//                 >
//                   {slot}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* MODAL */}
//       {showForm && (
//         <div className="modal-overlay">
//           <div className="modal-box">

//             <h3>Booking Details</h3>

//             <input name="name" placeholder="Full Name" onChange={handleChange} />
//             <input name="phone" placeholder="Phone Number" onChange={handleChange} />
//             <input name="email" placeholder="Email" onChange={handleChange} />

//             <select onChange={(e) => setSport(e.target.value)}>
//               <option value="">Select Sport</option>
//               <option value="Football">Football</option>
//               <option value="Cricket">Cricket</option>
//             </select>

//             {/* CRICKET OPTIONS */}
//             {sport === "Cricket" && (
//               <>
//                 <select onChange={(e) => setUmpire(e.target.value)}>
//                   <option value="no">Umpire Required? No</option>
//                   <option value="yes">Yes (₹50/hr)</option>
//                 </select>

//                 <select onChange={(e) => setScorecard(e.target.value)}>
//                   <option value="no">Digital Scorecard? No</option>
//                   <option value="yes">Yes (₹20)</option>
//                 </select>
//               </>
//             )}

//             <div className="summary">
//               <p><b>Sport:</b> {sport}</p>
//               <p><b>Date:</b> {date}</p>
//               <p><b>Time:</b> {selectedSlot} - {getEndTime()}</p>
//               <p><b>Duration:</b> {duration} Hour(s)</p>
//               <p><b>Court:</b> {court}</p>
//               <p className="price">Amount: ₹{totalPrice}</p>
//             </div>

//             <div className="modal-actions">
//               <button onClick={() => setShowForm(false)}>Cancel</button>
//               <button className="pay">Proceed to Payment</button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookTurf;


// import React, { useEffect, useState } from "react";
// import { getSlots } from "../services/slotService";
// import { calculatePrice } from "../services/pricingService";
// import "./BookTurf.css";

// import { createBooking } from "../services/bookingService";

// const handleContinueBooking = async () => {
//   try {
//     const res = await createBooking({
//       date: selectedDate,
//       slot: selectedSlot,
//       duration,
//       courtType,
//       amount: totalAmount,
//     });

//     navigate(`/payment/${res.data.bookingId}`);
//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };


// const BookTurf = () => {
//   const [date, setDate] = useState("");
//   const [duration, setDuration] = useState("");
//   const [court, setCourt] = useState("");
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState("");
//   const [price, setPrice] = useState(0);
//   const [isWeekend, setIsWeekend] = useState(false);

//   // Fetch available slots
//   useEffect(() => {
//     if (date && duration) {
//       getSlots(date, duration)
//         .then((res) => setSlots(res.data))
//         .catch(() => setSlots([]));
//     }
//   }, [date, duration]);

//   // Calculate price
//   useEffect(() => {
//     if (date && duration && court) {
//       calculatePrice({
//         date,
//         duration,
//         courtType: court,
//       }).then((res) => {
//         setPrice(res.data.totalPrice);
//         setIsWeekend(res.data.isWeekend);
//       });
//     }
//   }, [date, duration, court]);

//   return (
//     <div className="book-container">
//       <h2 className="page-title">🏟️ Book Your Turf</h2>

//       {/* FORM */}
//       <div className="booking-form">
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <select value={duration} onChange={(e) => setDuration(e.target.value)}>
//           <option value="">Select Duration</option>
//           {[1, 2, 3, 4].map((hr) => (
//             <option key={hr} value={hr}>
//               {hr} Hour
//             </option>
//           ))}
//         </select>

//         <select value={court} onChange={(e) => setCourt(e.target.value)}>
//           <option value="">Select Court</option>
//           <option value="5v5">5v5</option>
//           <option value="7v7">7v7</option>
//         </select>
//       </div>

//       {/* SLOT SECTION */}
//       {slots.length > 0 && (
//         <div className="slot-section">
//           <h3>Select Slot</h3>
//           <div className="slot-grid">
//             {slots.map((slot) => (
//               <button
//                 key={slot}
//                 className={`slot-btn ${
//                   selectedSlot === slot ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedSlot(slot)}
//               >
//                 {slot}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* SUMMARY */}
//       {price > 0 && (
//         <div className="summary-box">
//           <h3>Booking Summary</h3>
//           <p>Date: <b>{date}</b></p>
//           <p>Duration: <b>{duration} Hour(s)</b></p>
//           <p>Court: <b>{court}</b></p>
//           <p>
//             Day Type:{" "}
//             <b>{isWeekend ? "Weekend Pricing" : "Weekday Pricing"}</b>
//           </p>
//           <h2 className="price">Total Amount: ₹{price}</h2>

//           <button
//             className="book-btn"
//             disabled={!selectedSlot}
//             onClick={handleContinueBooking}>
//             Continue Booking
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookTurf;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getSlots } from "../services/slotService";
// import { calculatePrice } from "../services/pricingService";
// import { createBooking, getBookedSlots} from "../services/bookingService";
// import "./BookTurf.css";

// const BookTurf = () => {
//   const navigate = useNavigate();

//   // STATES
//   const [date, setDate] = useState("");
//   const [duration, setDuration] = useState("");
//   const [court, setCourt] = useState("");
//   const [slots, setSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState("");
//   const [price, setPrice] = useState(0);
//   const [isWeekend, setIsWeekend] = useState(false);

//   /* =========================
//      FETCH AVAILABLE SLOTS
//   ========================= */
//   useEffect(() => {
//     if (date && duration) {
//       getSlots(date, duration)
//         .then((res) => setSlots(res.data))
//         .catch(() => setSlots([]));
//     }
//   }, [date, duration]);

//   /* =========================
//      FETCH BOOKED SLOTS
//   ========================= */
//   useEffect(() => {
//     if (date && court) {
//       getBookedSlots(date, court)
//         .then((res) => setBookedSlots(res.data))
//         .catch(() => setBookedSlots([]));
//     }
//   }, [date, court]);

//   /* =========================
//      PRICE CALCULATION
//   ========================= */
//   useEffect(() => {
//     if (date && duration && court) {
//       calculatePrice({
//         date,
//         duration,
//         courtType: court,
//       }).then((res) => {
//         setPrice(res.data.totalPrice);
//         setIsWeekend(res.data.isWeekend);
//       });
//     }
//   }, [date, duration, court]);

//   /* =========================
//      CONTINUE BOOKING
//   ========================= */
//   const handleContinueBooking = async () => {
//     try {
//       const res = await createBooking({
//         date,
//         slot: selectedSlot,
//         duration,
//         courtType: court,
//         amount: price,
//       });

//       navigate(`/payment/${res.data.bookingId}`);
//     } catch (err) {
//       alert(err.response?.data?.message || "Booking failed");
//     }
//   };

//   return (
//     <div className="book-container">
//       <h2 className="page-title">🏟️ Book Your Turf</h2>

//       {/* BOOKING FORM */}
//       <div className="booking-form">
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => {
//             setDate(e.target.value);
//             setSelectedSlot("");
//           }}
//         />

//         <select
//           value={duration}
//           onChange={(e) => {
//             setDuration(e.target.value);
//             setSelectedSlot("");
//           }}
//         >
//           <option value="">Select Duration</option>
//           {[1, 2, 3, 4].map((hr) => (
//             <option key={hr} value={hr}>
//               {hr} Hour
//             </option>
//           ))}
//         </select>

//         <select
//           value={court}
//           onChange={(e) => {
//             setCourt(e.target.value);
//             setSelectedSlot("");
//           }}
//         >
//           <option value="">Select Court</option>
//           <option value="5v5">5v5</option>
//           <option value="7v7">7v7</option>
//         </select>
//       </div>

//       {/* SLOT SECTION */}
//       {slots.length > 0 && (
//         <div className="slot-section">
//           <h3>Select Slot</h3>

//           <div className="slot-grid">
//             {slots.map((slot) => {
//               const isBooked = bookedSlots.includes(slot);

//               return (
//                 <button
//                   key={slot}
//                   disabled={isBooked}
//                   className={`slot-btn 
//                     ${selectedSlot === slot ? "active" : ""}
//                     ${isBooked ? "disabled" : ""}
//                   `}
//                   onClick={() => !isBooked && setSelectedSlot(slot)}
//                 >
//                   {slot}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* SUMMARY */}
//       {price > 0 && (
//         <div className="summary-box">
//           <h3>Booking Summary</h3>
//           <p>
//             Date: <b>{date}</b>
//           </p>
//           <p>
//             Duration: <b>{duration} Hour(s)</b>
//           </p>
//           <p>
//             Court: <b>{court}</b>
//           </p>
//           <p>
//             Pricing:{" "}
//             <b>{isWeekend ? "Weekend Pricing" : "Weekday Pricing"}</b>
//           </p>

//           <h2 className="price">Total Amount: ₹{price}</h2>

//           <button
//             className="book-btn"
//             disabled={!selectedSlot}
//             onClick={handleContinueBooking}
//           >
//             Continue Booking
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookTurf;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSlots } from "../services/slotService";
import { calculatePrice } from "../services/pricingService";
import { createBooking, getBookedSlots } from "../services/bookingService";
import "./BookTurf.css";
import Header from "../components/Header";

const BookTurf = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/home");
  };

  // ================= STATES =================
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [court, setCourt] = useState("");
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [price, setPrice] = useState(0);
  const [isWeekend, setIsWeekend] = useState(false);

  // MANAGING DATE 
  const today = new Date().toISOString().split("T")[0];

  // ================= UTIL =================
  const timeToMinutes = (time) => {
    if (!time) return 0;

    const [t, meridian] = time.split(" ");
    let [h, m] = t.split(":").map(Number);

    if (meridian === "PM" && h !== 12) h += 12;
    if (meridian === "AM" && h === 12) h = 0;

    return h * 60 + (m || 0);
  };

  // ================= FETCH AVAILABLE SLOTS =================
  useEffect(() => {
    if (date && duration && court ) {
      getSlots(date, duration, court)
        .then((res) => setSlots(res.data))
        .catch(() => setSlots([]));

      setSelectedSlot("");
    }
  }, [date, duration, court]);

  // ================= FETCH BOOKED SLOTS =================
  useEffect(() => {
    if (date && court  ) {
      getBookedSlots(date, court)
        .then((res) => setBookedSlots(res.data))
        .catch(() => setBookedSlots([]));

      setSelectedSlot("");
    }
  }, [date, court]);

  // ================= PRICE CALCULATION =================
  useEffect(() => {
    if (date && duration && court) {
      calculatePrice({
        date,
        duration,
        courtType: court,
      }).then((res) => {
        setPrice(res.data.totalPrice);
        setIsWeekend(res.data.isWeekend);
      });
    }
  }, [date, duration, court]);

  // ================= CREATE BOOKING =================
  // const handleContinueBooking = async () => {
  //   if (!selectedSlot) return;

  //   try {
  //     const res = await createBooking({
  //       date,
  //       slot: selectedSlot,
  //       duration,
  //       courtType: court,
  //       amount: price,
  //     });

  //     navigate(`/payment/${res.data.bookingId}`);
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Booking failed");
  //   }
  // };


  // TEMPRORY HANDLE BOOKING 
  // BookTurf.js

const handleContinueBooking = () => {
  if (!selectedSlot) return;

  // Pass booking details to payment page via navigate state
  navigate("/payment", {
    state: {
      date,
      slot: selectedSlot,
      duration,
      courtType: court,
      amount: price,
    },
  });
};

  // ================= UI =================
  return (
    <>
    {/* <Header/> */}
    <br/>
    <div className="book-container">
      <div className="top-bar">
        <button id ="home-btn" onClick={goToHomePage}>
          ← Home
        </button>
      </div>
      <h2 className="page-title">🏟️ Book Your Turf</h2>

      {/* ================= FORM ================= */}
      <div className="booking-form">
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="">Select Duration</option>
          {[1, 2, 3, 4].map((hr) => (
            <option key={hr} value={hr}>
              {hr} Hour
            </option>
          ))}
        </select>

        <select value={court} onChange={(e) => setCourt(e.target.value)}>
          <option value="">Select Court</option>
          <option value="5v5">5v5</option>
          <option value="7v7">7v7</option>
        </select>
      </div>

      {/* ================= SLOT GRID ================= */}
      {slots.length > 0 && (
        <div className="slot-section">
          <h3>Available Slot</h3>

          <div className="slot-grid">
            {slots.map((slot) => {
              const slotStart = timeToMinutes(slot);
              const slotEnd = slotStart + Number(duration) * 60;

              // 🔥 CORE OVERLAP LOGIC
              const isBooked = bookedSlots.some((booking) => {
                const bookedStart = timeToMinutes(booking.slot);
                const bookedEnd =
                  bookedStart + booking.duration * 60;   // !isBooked &&

                return slotStart < bookedEnd && slotEnd > bookedStart;
              });
          

            
              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  className={`slot-btn
                    ${selectedSlot === slot ? "active" : ""}
                    ${isBooked ? "disabled" : ""}
                    
                   
                    
                  `}
                  onClick={() => !isBooked && setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= SUMMARY ================= */}
      {price > 0 && (
        <div className="summary-box">
          <h3>Booking Summary</h3>

          <p>
            Date: <b>{date}</b>
          </p>
          <p>
            Duration: <b>{duration} Hour(s)</b>
          </p>
          <p>
            Court: <b>{court}</b>
          </p>
          <p>
            Pricing:{" "}
            <b>{isWeekend ? "Weekend Pricing" : "Weekday Pricing"}</b>
          </p>

          <h2 className="price">Total Amount: ₹{price}</h2>

          <button
            className="book-btn"
            disabled={!selectedSlot}
            onClick={handleContinueBooking}
          >
            Continue Booking
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default BookTurf;

























