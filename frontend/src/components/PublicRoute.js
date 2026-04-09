// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   // If already logged in → go to home
//   if (token) {
//     return <Navigate to="/home" replace />;
//   }

//   return children;
// };

// export default PublicRoute;





import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;





