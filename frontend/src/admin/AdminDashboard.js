// import { useEffect, useState } from "react";
// import { getDashboardStats } from "../services/adminApi";
// import AdminSidebar from "../components/AdminSidebar";
// import StatCard from "../components/StatCard";
// import "../pages/admin.css";

// export default function Dashboard() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     getDashboardStats()
//       .then((res) => setStats(res.data.stats))
//       .catch(() => alert("Failed to load dashboard"));
//   }, []);

//   if (!stats) return <p className="loading">Loading Dashboard...</p>;

//   return (
//     <div className="admin-container">
//       <AdminSidebar />

//       <div className="admin-content">
//         <h1>Dashboard</h1>

//         <div className="stats-grid">
//           <StatCard title="Total Bookings" value={stats.totalBookings} />
//           <StatCard title="Confirmed" value={stats.confirmedBookings} />
//           <StatCard title="Cancelled" value={stats.cancelledBookings} />
//           <StatCard title="Today's Bookings" value={stats.todayBookings} />
//           <StatCard title="Total Users" value={stats.totalUsers} />
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import adminAPI from "../services/adminApi";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         const res = await adminAPI.get("/admin/dashboard");
//         setStats(res.data.stats);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         alert("Failed to load dashboard");
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, []);

//   if (loading) return <h2>Loading Dashboard...</h2>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Admin Dashboard</h1>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
//         <div>Total Bookings: {stats.totalBookings}</div>
//         <div>Confirmed: {stats.confirmedBookings}</div>
//         <div>Cancelled: {stats.cancelledBookings}</div>
//         <div>Today Bookings: {stats.todayBookings}</div>
//         <div>Total Users: {stats.totalUsers}</div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PeakSlotChart from "./peakSlot";
// import DailyBookingsChart from "./dailyBooking";
// import Sidebar from "./Sidebar";
// import AdminLayout from "./AdminLayout";

// const Dashboard = () => {
//   const [dashboard, setDashboard] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/admin/dashboard",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setDashboard(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load dashboard");
//     }
//   };

//   if (loading) return <h2>Loading Dashboard...</h2>;

//   // ✅ SAFE ACCESS
//   const stats = dashboard?.stats || {};
//   const charts = dashboard?.charts || { dailyBookings: [], peakSlots: [] };

//   return (
    
//     <div style={{ padding: "20px" }}>
//         <AdminLayout/>
    
    
//       <h1>Admin Dashboard</h1>

//       {/* ================= STATS ================= */}
//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         <Card title="Total Bookings" value={stats.totalBookings} />
//         <Card title="Confirmed Bookings" value={stats.confirmedBookings} />
//         <Card title="Cancelled Bookings" value={stats.cancelledBookings} />
//         <Card title="Today Bookings" value={stats.todayBookings} />
//         <Card title="Total Users" value={stats.totalUsers} />
//         <Card title="Today Revenue" value={`₹${stats.todayRevenue}`} />
//         <Card title="Monthly Revenue" value={`₹${stats.monthlyRevenue}`} />
//         <Card title="Upcoming Matches" value={stats.upcomingBookings} />
//       </div>

//       {/* ================= CHART DATA ================= */}
//       <div style={{ marginTop: "40px" }}>
//         <h3>Daily Bookings</h3>
//         {/* <pre>{JSON.stringify(charts.dailyBookings, null, 2)}</pre> */}
//         <DailyBookingsChart data={charts.dailyBookings} />

//         <h3>Peak Time Slots</h3>
//         {/* <pre>{JSON.stringify(charts.peakSlots, null, 2)}</pre> */}
//         <PeakSlotChart data={charts.peakSlots} />
//       </div>
//     </div>
//   );
// };
// const Card = ({ title, value }) => (
//   <div style={{
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     minWidth: "220px"
//   }}>
//     <h4>{title}</h4>
//     <h2>{value ?? 0}</h2>
//   </div>
// );

// export default Dashboard;











import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PeakSlotChart from "./peakSlot";
import DailyBookingsChart from "./dailyBooking";
import AdminLayout from "./AdminLayout";
import "./dashboard.css";
import AdminPricing from "./AdminPricing";



const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  //NEW
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");


      // ✅ If token missing → directly redirect (no API call)
      if (!token) {
        navigate("/login");
        return;
      }





      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setDashboard(res.data);
      setLoading(false);
    } catch (err) {
      //alert("Failed to load dashboard");
      // ✅ Handle ONLY this page error (no global side effect)
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        
        // ⛔ DO NOT remove token immediately (avoid breaking other APIs)
        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/login");
        }, 1500);

      } else {
        setError("Failed to load bookings");
      }
      
    }
  };

  if (loading) return <h2>Loading Dashboard...</h2>;

  const stats = dashboard?.stats || {};
  const charts = dashboard?.charts || { dailyBookings: [], peakSlots: [] };

 


  return (
    <AdminLayout>
      <div className="dashboard">

        <h1 className="dashboard-title">Admin Dashboard</h1>


        {/* STATS */}
        <div className="stats-grid">
          <StatCard title="Total Bookings" value={stats.totalBookings} />
          <StatCard title="Confirmed Bookings" value={stats.confirmedBookings} />
          <StatCard title="Cancelled Bookings" value={stats.cancelledBookings} />
          <StatCard title="Today Bookings" value={stats.todayBookings} />
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Today Revenue" value={`₹${stats.todayRevenue}`} />
          <StatCard title="Monthly Revenue" value={`₹${stats.monthlyRevenue}`} />
          <StatCard title="Upcoming Matches" value={stats.upcomingBookings} />
        </div>

        {/* CHARTS */}
        <div className="charts-section">
          <div className="chart-card">
            <h3>Daily Bookings</h3>
            <DailyBookingsChart data={charts.dailyBookings} />
          </div>

          <div className="chart-card">
            <h3>Peak Time Slots</h3>
            <PeakSlotChart data={charts.peakSlots} />
          </div>
        </div>

        <div><AdminPricing/></div>
        
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <p>{title}</p>
    <h2>{value ?? 0}</h2>
  </div>
);



export default Dashboard;















