// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import BookTurf from "./pages/BookTurf";
// import AdminDashboard from "./admin/AdminDashboard";
// import AdminRoute from "./components/AdminRoute";
// import Payment from "./pages/Payment";
// import AdminBlockSlots from "./admin/AdminBlockSlots";

// import Ticket from "./pages/Ticket";

// // ADMIN MANAGEMENT
// import Bookings from "./admin/Bookings";
// import AdminSettings from "./admin/AdminSettings";
// import AdminPricing from "./admin/AdminPricing";


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/book-turf" element={<BookTurf />} />
//         <Route path="/payment" element={<Payment />} />

//         <Route path="/ticket/:bookingId" element={<Ticket />} />


//         {/* ADMIN PROTECTED */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />

//         <Route
//           path="/admin/dashboard/block-slot"
//           element={
//             <AdminRoute>
//               <AdminBlockSlots />
//             </AdminRoute>
//           }
//         />


//         <Route
//           path="/admin/dashboard/management"
//           element={
//             <AdminRoute>
//               <Bookings />
//             </AdminRoute>
//           }
//         />


//         <Route
//           path="/admin/dashboard/setting"
//           element={
//             <AdminRoute>
//               <AdminPricing />
//             </AdminRoute>
//           }
//         />




       

        




//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;













import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookTurf from "./pages/BookTurf";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import MyBookings from "./pages/MyBookings";

import LoginSuccess from "./components/LoginSuccess";

// ADMIN
import AdminDashboard from "./admin/AdminDashboard";
import AdminBlockSlots from "./admin/AdminBlockSlots";
import Bookings from "./admin/Bookings";
import AdminPricing from "./admin/AdminPricing";
import AdminReports from "./admin/AdminReports";


// ROUTE GUARDS
import AdminRoute from "./admin/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ContactPage from "./pages/ContactPage";
import AboutTurf from "./pages/AboutTurf";


// TOKEN EXPIRY 
//import useAuthCheck from "./components/useAuthCheck";


// function App() {
//   useAuthCheck(); // 🔥 GLOBAL AUTH CHECK
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* -------- PUBLIC ROUTES -------- */}
//         <Route
//           path="/"
//           element={
//             <PublicRoute>
//               <Register />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />


//         <Route
//           path="/login-success"
//         element={
//           <ProtectedRoute>
//             <LoginSuccess />
//           </ProtectedRoute>
//         }
//         />

//         <Route
//           path="/contact"
//           element={
//             <ProtectedRoute>
//               <ContactPage />
//             </ProtectedRoute>
//           }
//         />


        






//         {/* -------- USER PROTECTED ROUTES -------- */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/book-turf"
//           element={
//             <ProtectedRoute>
//               <BookTurf />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/About-turf"
//           element={
//             <ProtectedRoute>
//               <AboutTurf />
//             </ProtectedRoute>
//           }
//         />






//         <Route
//           path="/payment"
//           element={
//             <ProtectedRoute>
//               <Payment />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/ticket/:bookingId"
//           element={
//             <ProtectedRoute>
//               <Ticket />
//             </ProtectedRoute>
//           }
//         />


//         <Route
//           path="/My-Bookings"
//           element={
//             <ProtectedRoute>
//               <MyBookings/>
//             </ProtectedRoute>
//           }
//         />






//         {/* -------- ADMIN PROTECTED ROUTES -------- */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />

//         <Route
//           path="/admin/dashboard/block-slot"
//           element={
//             <AdminRoute>
//               <AdminBlockSlots />
//             </AdminRoute>
//           }
//         />

//         <Route
//           path="/admin/dashboard/management"
//           element={
//             <AdminRoute>
//               <Bookings />
//             </AdminRoute>
//           }
//         />

//         <Route
//           path="/admin/dashboard/setting"
//           element={
//             <AdminRoute>
//               <AdminPricing />
//             </AdminRoute>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// your imports...

// 🔥 NEW COMPONENT
const AppContent = () => {
  //useAuthCheck(); // ✅ NOW INSIDE ROUTER

  return (
    <Routes>
      {/* -------- PUBLIC ROUTES -------- */}
      <Route path="/" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

      <Route path="/login-success" element={<ProtectedRoute><LoginSuccess /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />

      {/* -------- USER ROUTES -------- */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/book-turf" element={<ProtectedRoute><BookTurf /></ProtectedRoute>} />
      <Route path="/About-turf" element={<ProtectedRoute><AboutTurf /></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path="/ticket/:bookingId" element={<ProtectedRoute><Ticket /></ProtectedRoute>} />
      <Route path="/My-Bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

      {/* -------- ADMIN ROUTES -------- */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/dashboard/block-slot" element={<AdminRoute><AdminBlockSlots /></AdminRoute>} />
      <Route path="/admin/dashboard/management" element={<AdminRoute><Bookings /></AdminRoute>} />
      <Route path="/admin/dashboard/setting" element={<AdminRoute><AdminPricing /></AdminRoute>} />
      <Route path="/admin/dashboard/reports"element={<AdminRoute><AdminReports /></AdminRoute>}/>

    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent /> {/* ✅ FIX */}
    </BrowserRouter>
  );
}

export default App;