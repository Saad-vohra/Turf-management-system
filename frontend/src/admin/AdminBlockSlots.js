// import React, { useEffect, useState } from "react";
// import {
//   blockSlot,
//   getBlockedSlots,
//   unblockSlot,
//   blockFullDay,
// } from "../services/adminSlotService";
// import timeSlots from "../services/timeSlots";
// import "./AdminBlockSlots.css";

// const AdminBlockSlots = () => {
//   const [date, setDate] = useState("");
//   const [courtType, setCourtType] = useState("");
//   const [duration, setDuration] = useState("");
//   const [blockedSlots, setBlockedSlots] = useState([]);
  
//   // convert time → minutes (same logic everywhere)
//   const timeToMinutes = (time) => {
//     const [t, meridian] = time.split(" ");
//     let [h, m] = t.split(":").map(Number);

//     if (meridian === "PM" && h !== 12) h += 12;
//     if (meridian === "AM" && h === 12) h = 0;

//     return h * 60 + (m || 0);
//   };

//   // fetch blocked slots
//   useEffect(() => {
//     if (date && courtType) {
//       getBlockedSlots(date, courtType)
//         .then((res) => setBlockedSlots(res.data))
//         .catch(() => setBlockedSlots([]));
//     }
//   }, [date, courtType]);

//   // check overlap
//   // const isBlocked = (slot) => {
//   //   const start = timeToMinutes(slot);
//   //   const end = start + duration * 60;

//   //   return blockedSlots.some((b) => {
//   //     const bStart = timeToMinutes(b.slot);
//   //     const bEnd = bStart + b.duration * 60;

//   //     return start < bEnd && end > bStart;
//   //   });
//   // };

//   // ✅ correct block check (1 slot = 1 hour)
// const isBlocked = (slot) => {
//   const slotStart = timeToMinutes(slot);
//   const slotEnd = slotStart + 60; // 1 hour per slot

//   return blockedSlots.some((b) => {
//     const bStart = timeToMinutes(b.slot);
//     const bEnd = bStart + b.duration * 60;

//     return slotStart < bEnd && slotEnd > bStart;
//   });
// };


//   // block slot
// //   const handleBlock = async (slot) => {
// //     try {
// //       await blockSlot({
// //         date,
// //         slot,
// //         duration,
// //         courtType,
// //         reason: "Maintenance",
// //       });

// //       const res = await getBlockedSlots(date, courtType);
// //       setBlockedSlots(res.data);
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Block failed");
// //     }
// //   };


// const handleBlock = async (slot) => {
//   try {
//     console.log({
//       date,
//       slot,
//       duration,
//       courtType,
//     });

//     await blockSlot({
//       date,
//       slot,
//       duration,
//       courtType,
//       reason: "Maintenance",
//     });

//     const res = await getBlockedSlots(date, courtType);
//     setBlockedSlots(res.data);
//   } catch (err) {
//     console.log(err.response?.data);
//     alert(err.response?.data?.message || "Block failed");
//   }
// };


//   // unblock
//   const handleUnblock = async (id) => {
//     await unblockSlot(id);
//     const res = await getBlockedSlots(date, courtType);
//     setBlockedSlots(res.data);
//   };

  

//   return (
//     <div className="admin-container">
//       <h2>🛑 Admin Slot Blocking</h2>

//       <div className="admin-form">
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

//         <select value={courtType} onChange={(e) => setCourtType(e.target.value)}>
//           <option value="">Select Court</option>
//           <option value="5v5">5v5</option>
//           <option value="7v7">7v7</option>
//         </select>

//         <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
//           <option value="">Select Duration</option>
//           {[1, 2, 3, 4].map((d) => (
//             <option key={d} value={d}>
//               {d} Hour
//             </option>
//           ))}
//         </select>

//         {/* <select value={duration} onChange={(e) => setDuration(e.target.value)}>
//           <option value="">Select Duration</option>
//           {[1, 2, 3, 4].map((hr) => (
//             <option key={hr} value={hr}>
//               {hr} Hour
//             </option>
//           ))}
//         </select> */}

        

//       </div>

//       {date && courtType && (
//         <div className="slot-grid">
//           {timeSlots.map((slot) => {
//             const blocked = isBlocked(slot);
//             const blockedData = blockedSlots.find((b) => b.slot === slot);

//             return (
//               <div key={slot} className="slot-wrapper">
//                 <button
//                   className={`slot-btn ${blocked ? "blocked" : ""}`}
//                   disabled={blocked}
//                   onClick={() => handleBlock(slot)}
//                 >
//                   {slot}
//                 </button>

//                 {blockedData && (
//                   <button
//                     className="unblock-btn"
//                     onClick={() => handleUnblock(blockedData._id)}
//                   >
//                     Unblock
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

     
//     </div>
//   );
// };

// export default AdminBlockSlots;











// import React, { useEffect, useState } from "react";
// import {
//   blockSlot,
//   getBlockedSlots,
//   unblockSlot,
//   createOfflineBooking,
// } from "../services/adminSlotService";
// import timeSlots from "../services/timeSlots";
// import "./AdminBlockSlots.css";

// const AdminBlockSlots = () => {
//   const [date, setDate] = useState("");
//   const [courtType, setCourtType] = useState("");
//   const [duration, setDuration] = useState(1);
//   const [blockedSlots, setBlockedSlots] = useState([]);

//   // offline booking states
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [customer, setCustomer] = useState({
//     name: "",
//     phone: "",
//     email: "",
//   });
//   const [paymentMode, setPaymentMode] = useState("CASH");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [paidAmount, setPaidAmount] = useState(0);

//   // ⏱️ convert time → minutes
//   const timeToMinutes = (time) => {
//     const [t, meridian] = time.split(" ");
//     let [h, m] = t.split(":").map(Number);

//     if (meridian === "PM" && h !== 12) h += 12;
//     if (meridian === "AM" && h === 12) h = 0;

//     return h * 60 + (m || 0);
//   };

//   // fetch blocked slots
//   useEffect(() => {
//     if (date && courtType) {
//       getBlockedSlots(date, courtType)
//         .then((res) => setBlockedSlots(res.data))
//         .catch(() => setBlockedSlots([]));
//     }
//   }, [date, courtType]);

//   // overlap check
//   const isBlocked = (slot) => {
//     const slotStart = timeToMinutes(slot);
//     const slotEnd = slotStart + 60;

//     return blockedSlots.some((b) => {
//       const bStart = timeToMinutes(b.slot);
//       const bEnd = bStart + b.duration * 60;
//       return slotStart < bEnd && slotEnd > bStart;
//     });
//   };

//   // 🛑 maintenance block
//   const handleBlock = async () => {
//     try {
//       await blockSlot({
//         date,
//         slot: selectedSlot,
//         duration,
//         courtType,
//         reason: "Maintenance",
//       });

//       resetPanel();
//       refresh();
//     } catch (err) {
//       alert("Block failed");
//     }
//   };

//   // 💰 offline booking
//   const handleOfflineBooking = async () => {
//     try {
//       await createOfflineBooking({
//         date,
//         slot: selectedSlot,
//         duration,
//         courtType,
//         customer,
//         amount: totalAmount,
//         finalAmount: totalAmount,
//         paidAmount,
//         paymentMode,
//       });

//       resetPanel();
//       refresh();
//     } catch (err) {
//       alert("Offline booking failed");
//     }
//   };

//   const refresh = async () => {
//     const res = await getBlockedSlots(date, courtType);
//     setBlockedSlots(res.data);
//   };

//   const resetPanel = () => {
//     setSelectedSlot(null);
//     setCustomer({ name: "", phone: "", email: "" });
//     setPaidAmount(0);
//   };

//   // unblock
//   const handleUnblock = async (id) => {
//     await unblockSlot(id);
//     refresh();
//   };

//   return (
//     <div className="admin-container">
//       <h2>🛑 Admin Slot Blocking & Offline Booking</h2>

//       <div className="admin-form">
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

//         <select value={courtType} onChange={(e) => setCourtType(e.target.value)}>
//           <option value="">Select Court</option>
//           <option value="5v5">5v5</option>
//           <option value="7v7">7v7</option>
//         </select>

//         <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
//           {[1, 2, 3, 4].map((d) => (
//             <option key={d} value={d}>
//               {d} Hour
//             </option>
//           ))}
//         </select>
//       </div>

//       {date && courtType && (
//         <div className="slot-grid">
//           {timeSlots.map((slot) => {
//             const blocked = isBlocked(slot);
//             const blockedData = blockedSlots.find((b) => b.slot === slot);

//             return (
//               <div key={slot} className="slot-wrapper">
//                 <button
//                   className={`slot-btn ${blocked ? "blocked" : ""}`}
//                   disabled={blocked}
//                   onClick={() => {
//                     setSelectedSlot(slot);
//                     setTotalAmount(duration * 1000); // example pricing
//                   }}
//                 >
//                   {slot}
//                 </button>

//                 {blockedData && (
//                   <button
//                     className="unblock-btn"
//                     onClick={() => handleUnblock(blockedData._id)}
//                   >
//                     Unblock
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* 🧾 OFFLINE BOOKING PANEL */}
//       {selectedSlot && (
//         <div className="offline-panel">
//           <h3>📞 Offline Booking</h3>

//           <p><b>Date:</b> {date}</p>
//           <p><b>Slot:</b> {selectedSlot}</p>
//           <p><b>Court:</b> {courtType}</p>

//           <input
//             placeholder="Customer Name"
//             value={customer.name}
//             onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
//           />

//           <input
//             placeholder="Phone"
//             value={customer.phone}
//             onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
//           />

//           <input
//             placeholder="Email (optional)"
//             value={customer.email}
//             onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
//           />

//           <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
//             <option value="CASH">Cash</option>
//             <option value="ONLINE">Online</option>
//           </select>

//           <input
//             type="number"
//             placeholder="Advance Paid"
//             value={paidAmount}
//             onChange={(e) => setPaidAmount(Number(e.target.value))}
//           />

//           <p><b>Total:</b> ₹{totalAmount}</p>
//           <p><b>Balance:</b> ₹{totalAmount - paidAmount}</p>

//           <div className="action-btns">
//             <button onClick={handleOfflineBooking}>Confirm Offline Booking</button>
//             <button onClick={handleBlock}>Block for Maintenance</button>
//             <button onClick={resetPanel}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlockSlots;





// import React, { useEffect, useState } from "react";
// import {
//   blockSlot,
//   getBlockedSlots,
//   unblockSlot,
//   createOfflineBooking
// } from "../services/adminSlotService";
// import { calculatePrice } from "../services/pricingService";
// import timeSlots from "../services/timeSlots";
// import "./AdminBlockSlots.css";

// const AdminBlockSlots = () => {
//   const [date, setDate] = useState("");
//   const [courtType, setCourtType] = useState("");
//   const [duration, setDuration] = useState(1);
//   const [blockedSlots, setBlockedSlots] = useState([]);

//   // 🔹 Offline booking states
//   const [mode, setMode] = useState("BLOCK"); // BLOCK | OFFLINE
//   const [customer, setCustomer] = useState({
//     name: "",
//     phone: "",
//     email: "",
//   });
//   const [paymentMode, setPaymentMode] = useState("CASH");
//   const [paidAmount, setPaidAmount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(0);

//   // 🔁 convert time to minutes
//   const timeToMinutes = (time) => {
//     const [t, meridian] = time.split(" ");
//     let [h, m] = t.split(":").map(Number);
//     if (meridian === "PM" && h !== 12) h += 12;
//     if (meridian === "AM" && h === 12) h = 0;
//     return h * 60 + (m || 0);
//   };

//   // 🔄 fetch blocked slots
//   useEffect(() => {
//     if (date && courtType) {
//       getBlockedSlots(date, courtType)
//         .then((res) => setBlockedSlots(res.data))
//         .catch(() => setBlockedSlots([]));
//     }
//   }, [date, courtType]);

//   // 🔒 check if slot is blocked
//   const isBlocked = (slot) => {
//     const slotStart = timeToMinutes(slot);
//     const slotEnd = slotStart + 60;

//     return blockedSlots.some((b) => {
//       const bStart = timeToMinutes(b.slot);
//       const bEnd = bStart + b.duration * 60;
//       return slotStart < bEnd && slotEnd > bStart;
//     });
//   };

//   // 💰 calculate price using SAME USER API
//   const fetchPrice = async (slot) => {
//     const res = await calculatePrice({
//       date,
//       slot,
//       duration,
//       courtType,
//     });

//     setFinalAmount(res.data.finalAmount);
//     setPaidAmount(res.data.finalAmount); // default full payment
//   };

//   // 🛑 block slot
//   const handleBlock = async (slot) => {
//     await blockSlot({
//       date,
//       slot,
//       duration,
//       courtType,
//       reason: "Maintenance",
//     });

//     const res = await getBlockedSlots(date, courtType);
//     setBlockedSlots(res.data);
//   };

//   // 📞 offline booking
//   const handleOfflineBooking = async (slot) => {
//     if (!customer.name || !customer.phone) {
//       return alert("Customer name & phone required");
//     }

//     await createOfflineBooking({
//       date,
//       slot,
//       duration,
//       courtType,
//       customer,
//       amount: finalAmount,
//       finalAmount,
//       paidAmount,
//       paymentMode,
//     });

//     alert("Offline booking created");

//     const res = await getBlockedSlots(date, courtType);
//     setBlockedSlots(res.data);
//   };

//   // 🔓 unblock
//   const handleUnblock = async (id) => {
//     await unblockSlot(id);
//     const res = await getBlockedSlots(date, courtType);
//     setBlockedSlots(res.data);
//   };

//   return (
//     <div className="admin-container">
//       <h2>🛑 Admin Slot Management</h2>

//       {/* MODE */}
//       <div className="admin-form">
//         <select value={mode} onChange={(e) => setMode(e.target.value)}>
//           <option value="BLOCK">Block Slot</option>
//           <option value="OFFLINE">Offline Booking</option>
//         </select>

//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

//         <select value={courtType} onChange={(e) => setCourtType(e.target.value)}>
//           <option value="">Court</option>
//           <option value="5v5">5v5</option>
//           <option value="7v7">7v7</option>
//         </select>

//         <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
//           {[1, 2, 3, 4].map((d) => (
//             <option key={d} value={d}>{d} Hour</option>
//           ))}
//         </select>
//       </div>

//       {/* OFFLINE BOOKING FORM */}
//       {mode === "OFFLINE" && (
//         <div className="offline-form">
//           <input
//             placeholder="Customer Name"
//             onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
//           />
//           <input
//             placeholder="Phone"
//             onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
//           />
//           <input
//             placeholder="Email (optional)"
//             onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
//           />

//           <select onChange={(e) => setPaymentMode(e.target.value)}>
//             <option value="CASH">Cash</option>
//             <option value="ONLINE">Online</option>
//           </select>

//           <input
//             type="number"
//             placeholder="Paid Amount"
//             value={paidAmount}
//             onChange={(e) => setPaidAmount(Number(e.target.value))}
//           />

//           <p><b>Total:</b> ₹{finalAmount}</p>
//         </div>
//       )}

//       {/* SLOTS */}
//       {date && courtType && (
//         <div className="slot-grid">
//           {timeSlots.map((slot) => {
//             const blocked = isBlocked(slot);
//             const blockedData = blockedSlots.find((b) => b.slot === slot);

//             return (
//               <div key={slot} className="slot-wrapper">
//                 <button
//                   disabled={blocked}
//                   className={`slot-btn ${blocked ? "blocked" : ""}`}
//                   onClick={async () => {
//                     if (mode === "OFFLINE") {
//                       await fetchPrice(slot);
//                       await handleOfflineBooking(slot);
//                     } else {
//                       await handleBlock(slot);
//                     }
//                   }}
//                 >
//                   {slot}
//                 </button>

//                 {blockedData && (
//                   <button
//                     className="unblock-btn"
//                     onClick={() => handleUnblock(blockedData._id)}
//                   >
//                     Unblock
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlockSlots;














// import React, { useEffect, useState } from "react";
// import {
//   blockSlot,
//   getBlockedSlots,
//   unblockSlot,
//   createOfflineBooking,
// } from "../services/adminSlotService";
// import { calculatePrice } from "../services/pricingService";
// import timeSlots from "../services/timeSlots";
// import "./AdminBlockSlots.css";

// const AdminBlockSlots = () => {
//   // ------------------ SLOT FILTER ------------------
//   const [date, setDate] = useState("");
//   const [courtType, setCourtType] = useState("");
//   const [duration, setDuration] = useState(1);
//   const [blockedSlots, setBlockedSlots] = useState([]);

//   // ------------------ OFFLINE BOOKING ------------------
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [customerEmail, setCustomerEmail] = useState("");
//   const [paymentMode, setPaymentMode] = useState("Cash");
//   const [paidAmount, setPaidAmount] = useState(0);

//   // ------------------ PRICING ------------------
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [pricePerHour, setPricePerHour] = useState(0);

//   // ------------------ UTIL ------------------
//   const timeToMinutes = (time) => {
//     const [t, meridian] = time.split(" ");
//     let [h, m] = t.split(":").map(Number);

//     if (meridian === "PM" && h !== 12) h += 12;
//     if (meridian === "AM" && h === 12) h = 0;

//     return h * 60 + (m || 0);
//   };

//   // ------------------ FETCH BLOCKED SLOTS ------------------
//   useEffect(() => {
//     if (!date || !courtType) return;

//     getBlockedSlots(date, courtType)
//       .then((res) => setBlockedSlots(res.data))
//       .catch(() => setBlockedSlots([]));
//   }, [date, courtType]);

//   // ------------------ PRICE CALCULATION (FIXED) ------------------
//   useEffect(() => {
//     const fetchPrice = async () => {
//       if (!date || !courtType || !duration) {
//         setTotalAmount(0);
//         return;
//       }

//       try {
//         const res = await calculatePrice({
//           date,
//           courtType,
//           duration,
//         });

//         setTotalAmount(res.data.totalPrice);
//         setPricePerHour(res.data.perHourPrice);
//       } catch (err) {
//         console.error("Price calculation failed", err);
//         setTotalAmount(0);
//       }
//     };

//     fetchPrice();
//   }, [date, courtType, duration]);

//   // ------------------ SLOT CHECK ------------------
//   const isBlocked = (slot) => {
//     const slotStart = timeToMinutes(slot);
//     const slotEnd = slotStart + 60;

//     return blockedSlots.some((b) => {
//       const bStart = timeToMinutes(b.slot);
//       const bEnd = bStart + b.duration * 60;
//       return slotStart < bEnd && slotEnd > bStart;
//     });
//   };

//   // ------------------ BLOCK SLOT ------------------
//   const handleBlock = async (slot) => {
//     try {
//       await blockSlot({
//         date,
//         slot,
//         duration,
//         courtType,
//         reason: "Offline Booking",
//       });

//       const res = await getBlockedSlots(date, courtType);
//       setBlockedSlots(res.data);
//     } catch (err) {
//       alert("Slot block failed");
//     }
//   };

//   // ------------------ UNBLOCK ------------------
//   const handleUnblock = async (id) => {
//     await unblockSlot(id);
//     const res = await getBlockedSlots(date, courtType);
//     setBlockedSlots(res.data);
//   };

//   // ------------------ OFFLINE BOOKING SUBMIT ------------------
//   const handleOfflineBooking = async (slot) => {
//     if (!customerName || !customerPhone) {
//       alert("Customer name & phone required");
//       return;
//     }

//     try {
//       await createOfflineBooking({
//         date,
//         slot,
//         duration,
//         courtType,
//         amount: totalAmount,
//         paidAmount,
//         paymentMode,
//         customer: {
//           name: customerName,
//           phone: customerPhone,
//           email: customerEmail,
//         },
//       });

//       alert("Offline booking created");

//       const res = await getBlockedSlots(date, courtType);
//       setBlockedSlots(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Offline booking failed");
//     }
//   };

//   // ------------------ UI ------------------
//   return (
//     <div className="admin-container">
//       <h2>🛑 Admin Slot Management</h2>

//       <div className="admin-form">
//         <select>
//           <option>Offline Booking</option>
//         </select>

//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

//         <select value={courtType} onChange={(e) => setCourtType(e.target.value)}>
//           <option value="">Select Court</option>
//           <option value="5v5">5v5</option>
//           <option value="7v7">7v7</option>
//         </select>

//         <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
//           {[1, 2, 3, 4].map((d) => (
//             <option key={d} value={d}>
//               {d} Hour
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="offline-form">
//         <input
//           placeholder="Customer Name"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//         />

//         <input
//           placeholder="Phone"
//           value={customerPhone}
//           onChange={(e) => setCustomerPhone(e.target.value)}
//         />

//         <input
//           placeholder="Email"
//           value={customerEmail}
//           onChange={(e) => setCustomerEmail(e.target.value)}
//         />

//         <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
//           <option>Cash</option>
//           <option>Online</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Paid Amount"
//           value={paidAmount}
//           onChange={(e) => setPaidAmount(Number(e.target.value))}
//         />
//       </div>

//       <h3>Total: ₹{totalAmount}</h3>

//       {date && courtType && (
//         <div className="slot-grid">
//           {timeSlots.map((slot) => {
//             const blocked = isBlocked(slot);
//             const blockedData = blockedSlots.find((b) => b.slot === slot);

//             return (
//               <div key={slot} className="slot-wrapper">
//                 <button
//                   className={`slot-btn ${blocked ? "blocked" : ""}`}
//                   disabled={blocked}
//                   onClick={() => handleOfflineBooking(slot)}
//                 >
//                   {slot}
//                 </button>

//                 {blockedData && (
//                   <button
//                     className="unblock-btn"
//                     onClick={() => handleUnblock(blockedData._id)}
//                   >
//                     Unblock
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlockSlots;










import React, { useEffect, useState } from "react";
import {
  blockSlot,
  getBlockedSlots,
  unblockSlot,
  createOfflineBooking,
} from "../services/adminSlotService";
import { calculatePrice } from "../services/pricingService";
import timeSlots from "../services/timeSlots";
import "./AdminBlockSlots.css";
import AdminLayout from "./AdminLayout";

const AdminBlockSlots = () => {
  // ------------------ MODE ------------------
  const [mode, setMode] = useState("OFFLINE"); // OFFLINE | BLOCK

  // ------------------ SLOT FILTER ------------------
  const [date, setDate] = useState("");
  const [courtType, setCourtType] = useState("");
  const [duration, setDuration] = useState(1);
  const [blockedSlots, setBlockedSlots] = useState([]);
  


  // ------------------ OFFLINE BOOKING ------------------
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [paidAmount, setPaidAmount] = useState(0);

  // ------------------ PRICING ------------------
  const [totalAmount, setTotalAmount] = useState(0);

  // ------------------ TIME UTILS ------------------
  const timeToMinutes = (time) => {
    const [t, meridian] = time.split(" ");
    let [h, m] = t.split(":").map(Number);

    if (meridian === "PM" && h !== 12) h += 12;
    if (meridian === "AM" && h === 12) h = 0;

    return h * 60 + (m || 0);
  };

  // ------------------ FETCH BLOCKED ------------------
  useEffect(() => {
    if (!date || !courtType) return;

    getBlockedSlots(date, courtType)
      .then((res) => setBlockedSlots(res.data))
      .catch(() => setBlockedSlots([]));
  }, [date, courtType]);

  // ------------------ PRICE CALCULATION ------------------
  useEffect(() => {
    if (mode !== "OFFLINE") {
      setTotalAmount(0);
      return;
    }

    const fetchPrice = async () => {
      if (!date || !courtType || !duration) return;

      try {
        const res = await calculatePrice({
          date,
          courtType,
          duration,
        });

        setTotalAmount(res.data.totalPrice);
      } catch {
        setTotalAmount(0);
      }
    };

    fetchPrice();
  }, [date, courtType, duration, mode]);

  // ------------------ BLOCK CHECK ------------------
  const isBlocked = (slot) => {
    const slotStart = timeToMinutes(slot);
    const slotEnd = slotStart + 60;

    return blockedSlots.some((b) => {
      const bStart = timeToMinutes(b.slot);
      const bEnd = bStart + b.duration * 60;
      return slotStart < bEnd && slotEnd > bStart;
    });
  };

  // ------------------ BLOCK SLOT ------------------
  const handleBlockSlot = async (slot) => {
    try {
      await blockSlot({
        date,
        slot,
        duration,
        courtType,
        reason: "Maintenance",
      });

      const res = await getBlockedSlots(date, courtType);
      setBlockedSlots(res.data);
    } catch {
      alert("Slot Already Booked By the User!");
    }
  };

  // ------------------ OFFLINE BOOKING ------------------
  const handleOfflineBooking = async (slot) => {
    if (!customerName || !customerPhone) {
      alert("Customer name & phone required");
      return;
    }

    try {
      await createOfflineBooking({
        date,
        slot,
        duration,
        courtType,
        amount: totalAmount,
        paidAmount,
        paymentMode,
        customer: {
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
        },
      });

      alert("Offline booking created");

      const res = await getBlockedSlots(date, courtType);
      setBlockedSlots(res.data);
    } catch {
      alert("Slot Already Booked By the User!");
    }
  };

  // ------------------ UNBLOCK ------------------
  const handleUnblock = async (id) => {
    await unblockSlot(id);
    const res = await getBlockedSlots(date, courtType);
    setBlockedSlots(res.data);
  };

  // ------------------ SLOT CLICK ------------------
  const handleSlotClick = (slot) => {
    if (mode === "BLOCK") handleBlockSlot(slot);
    else handleOfflineBooking(slot);
  };





  // ------------------ UI ------------------
  return (
    <AdminLayout>
    <div className="admin-container">
      <h2>🛑 Admin Slot Management</h2>

      {/* MODE */}
      <div className="admin-form">
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="OFFLINE">Offline Booking</option>
          <option value="BLOCK">Block Slot (Maintenance)</option>
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <select value={courtType} onChange={(e) => setCourtType(e.target.value)}>
          <option value="">Select Court</option>
          <option value="5v5">5v5</option>
          <option value="7v7">7v7</option>
        </select>

        <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
          {[1, 2, 3, 4].map((d) => (
            <option key={d} value={d}>
              {d} Hour
            </option>
          ))}
        </select>
      </div>

      {/* OFFLINE FORM */}
      {mode === "OFFLINE" && (
        <>
          <div className="offline-form">
            <input placeholder="Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <input placeholder="Phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            <input placeholder="Email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />

            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
              <option>Cash</option>
              <option>Online</option>
            </select>

            <input
              type="number"
              placeholder="Paid Amount"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
            />
          </div>

          <h3>Total: ₹{totalAmount}</h3>
        </>
      )}

      {/* SLOTS */}
      {date && courtType && (
        <div className="slot-grid">
          {timeSlots.map((slot) => {
            const blocked = isBlocked(slot);
            const blockedData = blockedSlots.find((b) => b.slot === slot);

            return (
              <div key={slot} className="slot-wrapper">
                
                <button
                  className={`slot-btn ${blocked ? "blocked" : ""}`}
                  disabled={blocked}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </button>

                {blockedData &&   (
                  <button className="unblock-btn" onClick={() => handleUnblock(blockedData._id)}>
                    Unblock
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AdminBlockSlots;









