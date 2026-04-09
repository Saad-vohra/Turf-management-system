// import React, { useEffect, useState } from "react";
// import api from "../services/adminApi";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const AdminReports = () => {
//   const [data, setData] = useState(null);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");


//   const fetchReports = async () => {
//     try {
//       const res = await api.get(
//         `/admin/reports?fromDate=${fromDate}&toDate=${toDate}`
//       );
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const exportCSV = async () => {
//   const res = await api.get(
//     `/admin/reports/export/csv?fromDate=${fromDate}&toDate=${toDate}`,
//     { responseType: "blob" }
//   );

//   const url = window.URL.createObjectURL(new Blob([res.data]));
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "filtered_bookings.csv");
//   document.body.appendChild(link);
//   link.click();
// };

// const exportExcel = async () => {
//   const res = await api.get(
//     `/admin/reports/export/excel?fromDate=${fromDate}&toDate=${toDate}`,
//     { responseType: "blob" }
//   );

//   const url = window.URL.createObjectURL(new Blob([res.data]));
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "filtered_bookings.xlsx");
//   document.body.appendChild(link);
//   link.click();
// };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📊 Admin Reports</h2>

//       {/* 🔥 FILTER */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//         />
//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//         />
//         <button onClick={fetchReports}>Filter</button>
//       </div>

//       {/* 🔥 CARDS */}
//       {data && (
//         <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
//           <div className="card">Total: {data.totalBookings}</div>
//           <div className="card">Confirmed: {data.confirmedBookings}</div>
//           <div className="card">Cancelled: {data.cancelledBookings}</div>
//           <div className="card">Revenue: ₹{data.totalRevenue}</div>
//         </div>
//       )}

//       {/* 🔥 CHART */}
//       {data && (
//         <div style={{ width: "100%", height: 300 }}>
//           <ResponsiveContainer>
//             <LineChart data={data.chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="bookings" />
//               <Line type="monotone" dataKey="revenue" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {/* 🔥 EXPORT BUTTONS */}
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={exportCSV}>
//           Export CSV
//         </button>

//         <button onClick={exportExcel}>
//           Export Excel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminReports;


















import React, { useEffect, useState } from "react";
import api from "../services/adminApi";
import AdminLayout from "./AdminLayout";
import "./AdminReports.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminReports = () => {
  const [data, setData] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchReports = async () => {
    try {
      const res = await api.get(
        `/admin/reports?fromDate=${fromDate}&toDate=${toDate}`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = async () => {
    const res = await api.get(
      `/admin/reports/export/csv?fromDate=${fromDate}&toDate=${toDate}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "filtered_bookings.csv");
    document.body.appendChild(link);
    link.click();
  };

  const exportExcel = async () => {
    const res = await api.get(
      `/admin/reports/export/excel?fromDate=${fromDate}&toDate=${toDate}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "filtered_bookings.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 🔥 PIE DATA
  const pieData = data
    ? [
        { name: "Online", value: data.onlineBookings },
        { name: "Offline", value: data.offlineBookings },
      ]
    : [];

  return (
    <AdminLayout>
    <div  className = "admin-reports"style={{ padding: "20px" }}>
      <h2>📊 Admin Reports</h2>

      {/* 🔥 FILTER */}
      <div  className = "filter-box">
        <input 
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button onClick={fetchReports}>Filter</button>
      </div>

      {/* 🔥 MAIN CARDS */}
      {data && (
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div className="card">Total: {data.totalBookings}</div>
          <div className="card">Confirmed: {data.confirmedBookings}</div>
          <div className="card">Cancelled: {data.cancelledBookings}</div>
          <div className="card">Revenue: ₹{data.totalRevenue}</div>
        </div>
      )}

      {/* 🔥 LINE CHART */}
      {data && (
        <div  style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer className = "chart-box">
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" />
              <Line type="monotone" dataKey="revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 🔥 NEW SECTION */}
      {data && (
        <>
          <br/>
          <h3  className = "section-title"style={{ marginTop: "40px" }}>
            📊 Online vs Offline Report
          </h3>

          {/* CARDS */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >
            <div className="card">
              🌐 Online Bookings: {data.onlineBookings}
            </div>
            <div className="card">
              🏢 Offline Bookings: {data.offlineBookings}
            </div>
            <div className="card">
              💰 Online Revenue: ₹{data.onlineRevenue}
            </div>
            <div className="card">
              💵 Offline Revenue: ₹{data.offlineRevenue}
            </div>
          </div>

          {/* PIE CHART */}
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer >
              <PieChart className="pie-chart-box">
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#4CAF50" />
                  <Cell fill="#FF9800" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
      <br/>
      <br/>
      {/* 🔥 EXPORT BUTTONS */}
      <div className="export-buttons"style={{ marginTop: "20px" }}>
        <button onClick={exportCSV}>Export CSV</button>
        <button onClick={exportExcel}>Export Excel</button>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminReports;