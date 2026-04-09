// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const useAuthCheck = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const currentTime = Date.now() / 1000;

//       // 🔥 TOKEN EXPIRED
//       if (payload.exp < currentTime) {
//         localStorage.removeItem("token");
//         alert("Session expired. Please login again.");
//         navigate("/login");
//       }
//     } catch (err) {
//       localStorage.removeItem("token");
//       navigate("/login");
//     }
//   }, [navigate]);
// };

// export default useAuthCheck;







// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const useAuthCheck = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const currentTime = Date.now() / 1000;

//       // 🔥 IF ALREADY EXPIRED
//       if (payload.exp < currentTime) {
//         localStorage.removeItem("token");
//         navigate("/login");
//         return;
//       }

//       // 🔥 AUTO LOGOUT TIMER (IMPORTANT)
//       const expiryTime = payload.exp * 1000;
//       const timeout = expiryTime - Date.now();

//       const timer = setTimeout(() => {
//         localStorage.removeItem("token");
  
//         //window.location.href = "/login";
//         //toast.error("Session expired. Please login again.");
//         alert("Session expired. Please login again.");
//         navigate("/login"); // 🔥 AUTO REDIRECT
//       }, timeout);

//       // Cleanup
//       return () => clearTimeout(timer);

//     } catch (err) {
//       localStorage.removeItem("token");
//       navigate("/login");
//     }
//   }, [navigate]);
// };

// export default useAuthCheck;




















