// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BookingCard from "../components/BookingCard";
// import "../components/bookingCard.css";
// import "../components/Header.js";
// import Header from "../components/Header.js";

// const MyBookings = () => {

//   const [bookings, setBookings] = useState([]);

//   const fetchBookings = async () => {

//     const token = localStorage.getItem("token");

//     const res = await axios.get(
//       "http://localhost:5000/api/bookings/my-bookings",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     setBookings(res.data.bookings);
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <>
//     <Header/>
//     <div style={{ padding: "40px" }}>


//       <h2 style={{ textAlign: "center" }}>My Bookings</h2>

//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center"
//         }}
//       >

//         {bookings.length === 0 ? (
//           <p>No bookings found</p>
//         ) : (
//           bookings.map((booking) => (
//             <BookingCard key={booking._id} booking={booking} />
//           ))
//         )}

//       </div>

//     </div>
//     </>
//   );
// };

// export default MyBookings;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BookingCard from "../components/BookingCard";
// import "../components/bookingCard.css";
// import "../components/Header.js";
// import Header from "../components/Header.js";
// const MyBookings = () => {

//   const [bookings, setBookings] = useState([]);
//   const [filter, setFilter] = useState("ALL");

//   const fetchBookings = async () => {

//     const token = localStorage.getItem("token");

//     const res = await axios.get(
//       "http://localhost:5000/api/bookings/my-bookings",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     setBookings(res.data.bookings);
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const today = new Date();

//   const filteredBookings = bookings.filter((booking) => {

//     const bookingDate = new Date(booking.date);

//     if (filter === "UPCOMING") {
//       return bookingDate >= today;
//     }

//     if (filter === "PAST") {
//       return bookingDate < today;
//     }

//     return true;
//   });

//   return (
//     <>
//     <Header/>
//     <div style={{ padding: "40px" }}>

//       <h2 style={{ textAlign: "center" }}>My Bookings</h2>

//       {/* FILTER BUTTONS */}

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "15px",
//           marginBottom: "30px"
//         }}
//       >

//         <button
//           id = "all-filter-button"
//           className={filter === "ALL" ? "active-filter" : ""}
//           onClick={() => setFilter("ALL")}
//         >
//           All
//         </button>

//         <button
//           id = "all-filter-button"
//           className={filter === "UPCOMING" ? "active-filter" : ""}
//           onClick={() => setFilter("UPCOMING")}
//         >
//           Upcoming
//         </button>

//         <button
//           id = "all-filter-button"
//           className={filter === "PAST" ? "active-filter" : ""}
//           onClick={() => setFilter("PAST")}
//         >
//           Past
//         </button>

//       </div>

//       {/* BOOKING CARDS */}

//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center"
//         }}
//       >

//         {filteredBookings.length === 0 ? (
//           <p>No bookings found</p>
//         ) : (
//           filteredBookings.map((booking) => (
//             <BookingCard key={booking._id} booking={booking} />
//           ))
//         )}

//       </div>

//     </div>
//     </>
//   );
// };

// export default MyBookings;












import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import "../components/bookingCard.css";
import Header from "../components/Header.js";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ If token missing → directly redirect (no API call)
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(res.data.bookings);
      setError("");

    } catch (err) {
      console.log(err);

      // ✅ Handle ONLY this page error (no global side effect)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        
        // ⛔ DO NOT remove token immediately (avoid breaking other APIs)
        // setTimeout(() => {
        //   localStorage.removeItem("token");
        //   navigate("/login");
        // }, 1500);

      } else {
        setError("Failed to load bookings");
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const today = new Date();

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);

    if (filter === "UPCOMING") return bookingDate >= today;
    if (filter === "PAST") return bookingDate < today;

    return true;
  });

  return (
    <>
      <Header />

      <div style={{ padding: "40px" }}>
        <h2 style={{ textAlign: "center" }}>My Bookings</h2>

        {/* FILTER BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "30px"
          }}
        >
          <button
            id = "all-filter-button"
            className={filter === "ALL" ? "active-filter" : ""}
            onClick={() => setFilter("ALL")}
          >
            All
          </button>

          <button
            id = "all-filter-button"
            className={filter === "UPCOMING" ? "active-filter" : ""}
            onClick={() => setFilter("UPCOMING")}
          >
            Upcoming
          </button>

          <button
            id = "all-filter-button"
            className={filter === "PAST" ? "active-filter" : ""}
            onClick={() => setFilter("PAST")}
          >
            Past
          </button>
        </div>

        {/* ✅ ERROR MESSAGE */}
        {error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            {filteredBookings.length === 0 ? (
              <p>No bookings found</p>
            ) : (
              filteredBookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;