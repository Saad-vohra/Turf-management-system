// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function Payment() {
//   const { bookingId } = useParams();

//   const [booking, setBooking] = useState(null);
//   const [sport, setSport] = useState("");
//   const [umpire, setUmpire] = useState(false);
//   const [scorecard, setScorecard] = useState(false);
//   const [finalAmount, setFinalAmount] = useState(0);

//   const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   // 🔹 Fetch booking
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/bookings/${bookingId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         setBooking(res.data);
//         setFinalAmount(res.data.amount);
//       });
//   }, [bookingId]);

//   // 🔹 Calculate pricing
//   useEffect(() => {
//     if (!booking) return;

//     let total = booking.amount;

//     if (sport === "Cricket") {
//       if (umpire) total += booking.duration * 50;
//       if (scorecard) total += 20;
//     }

//     setFinalAmount(total);
//   }, [sport, umpire, scorecard, booking]);

//   // 🔹 Save pricing
//   const handleConfirm = async () => {
//     await axios.put(
//       `http://localhost:5000/api/bookings/${bookingId}/pricing`,
//       {
//         sport,
//         umpire,
//         scorecard,
//         customer,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     alert("Booking Confirmed (Payment Gateway next)");
//   };

//   if (!booking) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <h2>Payment Details</h2>

//       <input placeholder="Name" onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
//       <input placeholder="Email" onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
//       <input placeholder="Phone" onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />

//       <select onChange={(e) => setSport(e.target.value)}>
//         <option value="">Select Sport</option>
//         <option value="Football">Football</option>
//         <option value="Cricket">Cricket</option>
//       </select>

//       {sport === "Cricket" && (
//         <>
//           <label>
//             <input type="checkbox" onChange={() => setUmpire(!umpire)} />
//             Umpire (₹50/hour)
//           </label>

//           <label>
//             <input type="checkbox" onChange={() => setScorecard(!scorecard)} />
//             Scorecard (₹20/game)
//           </label>
//         </>
//       )}

//       <h3>Final Amount: ₹{finalAmount}</h3>

//       <button onClick={handleConfirm}>Confirm & Pay</button>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import "./Payment.css";

// export default function Payment() {
//   const { bookingId } = useParams();

//   const [booking, setBooking] = useState(null);
//   const [sport, setSport] = useState("");
//   const [umpire, setUmpire] = useState(false);
//   const [scorecard, setScorecard] = useState(false);
//   const [finalAmount, setFinalAmount] = useState(0);

//   const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   // Fetch booking
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/bookings/${bookingId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         setBooking(res.data);
//         setFinalAmount(res.data.amount);
//       });
//   }, [bookingId]);

//   // Calculate pricing
//   useEffect(() => {
//     if (!booking) return;

//     let total = booking.amount;

//     if (sport === "Cricket") {
//       if (umpire) total += booking.duration * 50;
//       if (scorecard) total += 20;
//     }

//     setFinalAmount(total);
//   }, [sport, umpire, scorecard, booking]);

//   // Save pricing
//   const handleConfirm = async () => {
//     await axios.put(
//       `http://localhost:5000/api/bookings/${bookingId}/pricing`,
//       {
//         sport,
//         umpire,
//         scorecard,
//         customer,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     alert("Booking Confirmed! (Payment gateway coming next)");
//   };

//   if (!booking) return <p className="loading">Loading...</p>;

//   return (
//     <div className="payment-page">
//       <div className="payment-card">
//         <h2>💳 Payment Details</h2>

//         {/* Customer Info */}
//         <div className="form-grid">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={customer.name}
//             onChange={(e) =>
//               setCustomer({ ...customer, name: e.target.value })
//             }
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={customer.email}
//             onChange={(e) =>
//               setCustomer({ ...customer, email: e.target.value })
//             }
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={customer.phone}
//             onChange={(e) =>
//               setCustomer({ ...customer, phone: e.target.value })
//             }
//           />
//         </div>

//         {/* Sport */}
//         <div className="section">
//           <label>Select Sport</label>
//           <select value={sport} onChange={(e) => setSport(e.target.value)}>
//             <option value="">Choose Sport</option>
//             <option value="Football">Football</option>
//             <option value="Cricket">Cricket</option>
//           </select>
//         </div>

//         {/* Cricket Extras */}
//         {sport === "Cricket" && (
//           <div className="extras">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={umpire}
//                 onChange={() => setUmpire(!umpire)}
//               />
//               Umpire (₹50 / hour)
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={scorecard}
//                 onChange={() => setScorecard(!scorecard)}
//               />
//               Scorecard (₹20 / game)
//             </label>
//           </div>
//         )}

//         {/* Amount */}
//         <div className="amount-box">
//           <span>Final Amount</span>
//           <h3>₹{finalAmount}</h3>
//         </div>

//         <button className="pay-btn" onClick={handleConfirm}>
//           Confirm & Pay
//         </button>
//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Payment.css";

// export default function Payment() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ✅ Get booking info from previous page (BookTurf)
//   const { date, slot, duration, courtType, amount } = location.state;

//   // ================= STATES =================
//   const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [sport, setSport] = useState("");
//   const [umpire, setUmpire] = useState(false);
//   const [scorecard, setScorecard] = useState(false);
//   const [finalAmount, setFinalAmount] = useState(amount);

//   // ================= CALCULATE FINAL AMOUNT =================
//   const calculateFinalAmount = () => {
//     let total = amount;
//     if (sport === "Cricket") {
//       if (umpire) total += duration * 50; // ₹50/hour
//       if (scorecard) total += 20; // ₹20/game
//     }
//     setFinalAmount(total);
//   };

//   // ================= HANDLE CONFIRM & PAY =================
//   const handleConfirmPayment = async () => {
//     if (!customer.name || !customer.email || !customer.phone || !sport) {
//       return alert("Please fill all details");
//     }

//     try {
//       // 🔐 Create booking in DB with status LOCKED
//       const res = await axios.post(
//         "http://localhost:5000/api/bookings/create",
//         {
//           date,
//           slot,
//           duration,
//           courtType,
//           amount,
//           customer,
//           sport,
//           umpire,
//           scorecard,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert(
//         "Booking created! Complete payment within 10 minutes to confirm."
//       );

//       // Navigate to Razorpay or payment page with bookingId
//       navigate(`/razorpay/${res.data.bookingId}`);
//     } catch (err) {
//       alert(err.response?.data?.message || "Booking creation failed");
//     }
//   };

//   // ================= RENDER =================
//   return (
//     <div className="payment-page">
//       <div className="payment-card">
//         <h2>💳 Payment Details</h2>

//         {/* Customer Info */}
//         <div className="form-grid">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={customer.name}
//             onChange={(e) =>
//               setCustomer({ ...customer, name: e.target.value })
//             }
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={customer.email}
//             onChange={(e) =>
//               setCustomer({ ...customer, email: e.target.value })
//             }
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={customer.phone}
//             onChange={(e) =>
//               setCustomer({ ...customer, phone: e.target.value })
//             }
//           />
//         </div>

//         {/* Sport */}
//         <div className="section">
//           <label>Select Sport</label>
//           <select
//             value={sport}
//             onChange={(e) => {
//               setSport(e.target.value);
//               calculateFinalAmount();
//             }}
//           >
//             <option value="">Choose Sport</option>
//             <option value="Football">Football</option>
//             <option value="Cricket">Cricket</option>
//           </select>
//         </div>

//         {/* Cricket Extras */}
//         {sport === "Cricket" && (
//           <div className="extras">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={umpire}
//                 onChange={() => {
//                   setUmpire(!umpire);
//                   calculateFinalAmount();
//                 }}
//               />
//               Umpire (₹50 / hour)
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 checked={scorecard}
//                 onChange={() => {
//                   setScorecard(!scorecard);
//                   calculateFinalAmount();
//                 }}
//               />
//               Scorecard (₹20 / game)
//             </label>
//           </div>
//         )}

//         {/* Amount */}
//         <div className="amount-box">
//           <span>Final Amount</span>
//           <h3>₹{finalAmount}</h3>
//         </div>

//         <button className="pay-btn" onClick={handleConfirmPayment}>
//           Confirm & Pay
//         </button>
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

// TOAST 
import { toast } from "react-toastify";


export default function Payment() {
  const navigate = useNavigate();

  const goToBookingPage = () => {
    navigate("/book-turf");
  };


  const location = useLocation();

  // Data coming from Booking page
  const {
    turfId,
    date,
    slot,
    duration,
    courtType,
    amount, // base amount (₹1500)
  } = location.state || {};

  const [sport, setSport] = useState("");
  const [umpire, setUmpire] = useState(false);
  const [scorecard, setScorecard] = useState(false);
  const [finalAmount, setFinalAmount] = useState(amount);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  /* ===============================
     PAYMENT CALCULATION (FIXED)
  =============================== */
  useEffect(() => {
    let total = amount;

    if (sport === "Cricket") {
      if (umpire) total += duration * 50; // ₹50 per hour
      if (scorecard) total += 20; // ₹20 per game
    }

    setFinalAmount(total);
  }, [sport, umpire, scorecard, amount, duration]);

  /* ===============================
     CONFIRM & PAY (CREATE BOOKING)
  =============================== */
  // const handleConfirm = async () => {
  //   if (!customer.name || !customer.phone || !sport) {
  //     alert("Please fill all required details");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/bookings/create",
  //       {
  //         turfId,
  //         date,
  //         slot,
  //         duration,
  //         courtType,
  //         sport,
  //         umpire,
  //         scorecard,
  //         amount: finalAmount,
  //         customer,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     alert("Slot Locked! Complete payment within 10 minutes ⏳");

  //     // Razorpay will come here later
  //      navigate(`/payment-gateway/${res.data.bookingId}`);

  //   } catch (error) {
  //     console.error(error);
  //     alert("Booking failed. Slot may already be locked.");
  //   }
  // };

  const handleConfirm = async () => {
  if (!customer.name || !customer.phone || !sport) {
    alert("Please fill all required details");
    return;
  }

  try {
    /* ===============================
       1️⃣ CREATE BOOKING (LOCK SLOT)
    =============================== */
    const bookingRes = await axios.post(
      "http://localhost:5000/api/bookings/create",
      {
        turfId,
        date,
        slot,
        duration,
        courtType,
        sport,
        umpire,
        scorecard,
        amount: finalAmount,
        customer,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const bookingId = bookingRes.data.bookingId;

    alert("Slot Locked! Complete payment within 10 minutes ⏳");

    /* ===============================
       2️⃣ CREATE RAZORPAY ORDER
    =============================== */
    const orderRes = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        bookingId,
        amount: finalAmount,
      }
    );

    /* ===============================
       3️⃣ OPEN RAZORPAY CHECKOUT
    =============================== */
    const options = {
      key: "rzp_test_S8UHefIXTWhfJZ", // test key
      amount: orderRes.data.amount,
      currency: "INR",
      name: "Turf Booking",
      description: "Turf Slot Payment",
      order_id: orderRes.data.id,

      handler: async function (response) {
        /* ===============================
           4️⃣ VERIFY PAYMENT (BACKEND)
        =============================== */
        await axios.post("http://localhost:5000/api/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          bookingId,
        });
        //alert("Payment Successful 🎉");

        // navigate("/ticket", {
        //   state: { booking: bookingRes.data.booking },
        // });
        await axios.post(
              "http://localhost:5000/api/bookings/confirm-payment",
              { bookingId },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
        // ✅ SHOW TOAST FIRST
        toast.success("Payment successful 🎉 Redirecting to ticket...", {
          autoClose: 2000,
        });
        navigate(`/ticket/${bookingId}`);

      },

      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },

      theme: {
        color: "#1B5E20",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error(error);
    alert("Booking or Payment failed ❌");
  }
};


  if (!amount) return <p className="loading">Invalid booking</p>;




  return (
    
    <div className="payment-page">
  
      <div className="payment-card">

        <div className="top-bar">
        <button id ="home-btn" onClick={goToBookingPage}>
          ← back
        </button>
      </div>

        <h2>💳 Payment Details</h2>

        {/* Customer Info */}
        <div className="form-grid">
          <input
            type="text"
            placeholder="Full Name"
            value={customer.name}
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />
        </div>

        {/* Sport */}
        <div className="section">
          <label>Select Sport</label>
          <select value={sport} onChange={(e) => setSport(e.target.value)}>
            <option value="">Choose Sport</option>
            <option value="Football">Football</option>
            <option value="Cricket">Cricket</option>
          </select>
        </div>

        {/* Cricket Extras */}
        {sport === "Cricket" && (
          <div className="extras">
            <label>
              <input
                type="checkbox"
                checked={umpire}
                onChange={() => setUmpire(!umpire)}
                
              />
              Umpire (₹50 / hour)
            </label>

            <label>
              <input
                type="checkbox"
                checked={scorecard}
                onChange={() => setScorecard(!scorecard)}
              />
              Scorecard (₹20 / game)
            </label>
          </div>
        )}

        {/* Final Amount */}
        <div className="amount-box">
          <span>Final Amount</span>
          <h3>₹{finalAmount}</h3>
        </div>

        <button className="pay-btn" onClick={handleConfirm}>
          Confirm & Pay
        </button>
      </div>
    

    
    </div>

    

    
  );
}
