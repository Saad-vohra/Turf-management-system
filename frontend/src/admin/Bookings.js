// import React, { useEffect, useState ,useCallback } from "react";
// import {
//   fetchBookings,
//   markCheckedIn,
//   viewTicket,
// } from "../services/adminBookingService";
// import Pagination from "./Pagination";
// import AdminLayout from "./AdminLayout";
// import "./Booking.css";

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [pagination, setPagination] = useState({});
//   const [filters, setFilters] = useState({
//     page: 1,
//     paymentStatus: "",
//     checkedIn: "",
//     date: "",
//   });

// //   const loadBookings = async () => {
// //     const res = await fetchBookings(filters);
// //     setBookings(res.data.bookings);
// //     setPagination(res.data.pagination);
// //   };

// //   useEffect(() => {
// //     loadBookings();
// //   }, [filters]);

//     const loadBookings = useCallback(async () => {
//   const res = await fetchBookings(filters);
//   setBookings(res.data.bookings);
//   setPagination(res.data.pagination);
// }, [filters]);

// useEffect(() => {
//   loadBookings();
// }, [loadBookings]);

//   return (
//     <AdminLayout>
//     <div className="booking-container">
//       <h2>📋 Bookings Management</h2>

//       {/* FILTERS */}
//       <div className="filters">
//         <input
//           type="date"
//           onChange={(e) =>
//             setFilters({ ...filters, date: e.target.value, page: 1 })
//           }
//         />

//         <select
//           onChange={(e) =>
//             setFilters({ ...filters, paymentStatus: e.target.value, page: 1 })
//           }
//         >
//           <option value="">All Payments</option>
//           <option value="PAID">Paid</option>
//           <option value="PENDING">Pending</option>
//         </select>

//         <select
//           onChange={(e) =>
//             setFilters({ ...filters, checkedIn: e.target.value, page: 1 })
//           }
//         >
//           <option value="">All</option>
//           <option value="true">Checked-In</option>
//           <option value="false">Not Checked-In</option>
//         </select>
//       </div>

//       {/* TABLE */}
//       <table className="booking-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User</th>
//             <th>Date</th>
//             <th>Slot</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Check-In</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {bookings.map((b) => (
//             <tr key={b._id}>
//               <td>{b._id.slice(-6)}</td>
//               <td>{b.customer?.name || "Online User"}</td>
//               <td>{b.date}</td>
//               <td>{b.slot}</td>
//               <td>₹{b.amount}</td>
//               <td>
//                 <span className={`badge ${b.paymentStatus}`}>
//                   {b.paymentStatus}
//                 </span>
//               </td>
//               <td>
//                 {b.checkedIn ? (
//                   <span className="badge checked">YES</span>
//                 ) : (
//                   <span className="badge not">NO</span>
//                 )}
//               </td>
//               <td className="actions">
//                 <button onClick={() => viewTicket(b._id)}>🎟 View</button>

//                 {!b.checkedIn && (
//                   <button
//                     className="checkin"
//                     onClick={() => markCheckedIn(b._id).then(loadBookings)}
//                   >
//                     ✔ Check-In
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Pagination
//         page={pagination.page}
//         pages={pagination.pages}
//         onChange={(p) => setFilters({ ...filters, page: p })}
//       />
//     </div>
//     </AdminLayout>
//   );
// };

// export default Bookings;











import React, { useEffect, useState, useCallback } from "react";
import {
  fetchBookings,
  markCheckedIn,
  viewTicket,
} from "../services/adminBookingService";
import Pagination from "./Pagination";
import AdminLayout from "./AdminLayout";
import "./Booking.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    paymentStatus: "",
    checkedIn: "",
    date: "",
  });

  const loadBookings = useCallback(async () => {
    const res = await fetchBookings(filters);
    setBookings(res.data.bookings);
    setPagination(res.data.pagination);
  }, [filters]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return (
    <AdminLayout>
      <div className="booking-container">
        <h2>📋 Bookings Management</h2>

        {/* FILTERS */}
        <div className="filters">
          <input
            type="date"
            onChange={(e) =>
              setFilters({ ...filters, date: e.target.value, page: 1 })
            }
          />

          <select
            onChange={(e) =>
              setFilters({
                ...filters,
                paymentStatus: e.target.value,
                page: 1,
              })
            }
          >
            <option value="">All Payments</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
          </select>

          <select
            onChange={(e) =>
              setFilters({
                ...filters,
                checkedIn: e.target.value,
                page: 1,
              })
            }
          >
            <option value="">All</option>
            <option value="true">Checked-In</option>
            <option value="false">Not Checked-In</option>
          </select>
        </div>

        {/* TABLE */}
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Check-In</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => {
              // 🔥 Calculate remaining amount safely
              const totalAmount = b.amount || 0;
              const paidAmount = b.paidAmount || 0; // MUST come from backend
              const remainingAmount = totalAmount - paidAmount;

              // 🔥 Decide status text
              let statusText = b.paymentStatus;

              if (b.paymentStatus === "PENDING" && remainingAmount > 0) {
                statusText = `PENDING (₹${remainingAmount} left)`;
              } else if (remainingAmount <= 0) {
                statusText = "PAID";
              }

              return (
                <tr key={b._id}>
                  <td>{b._id.slice(-6)}</td>
                  <td>{b.customer?.name || "Online User"}</td>
                  <td>{b.date}</td>
                  <td>{b.slot}</td>
                  <td>₹{b.amount}</td>

                  {/* ✅ UPDATED STATUS COLUMN */}
                  <td>
                    <span className={`badge ${b.paymentStatus}`}>
                      {statusText}
                    </span>
                  </td>

                  <td>
                    {b.checkedIn ? (
                      <span className="badge checked">YES</span>
                    ) : (
                      <span className="badge not">NO</span>
                    )}
                  </td>

                  <td className="actions">
                    <button onClick={() => viewTicket(b._id)}>
                      🎟 View
                    </button>

                    {!b.checkedIn && (
                      <button
                        className="checkin"
                        onClick={() =>
                          markCheckedIn(b._id).then(loadBookings)
                        }
                      >
                        ✔ Check-In
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          page={pagination.page}
          pages={pagination.pages}
          onChange={(p) => setFilters({ ...filters, page: p })}
        />
      </div>
    </AdminLayout>
  );
};

export default Bookings;