// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   // If not logged in → go to login
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };


// export default ProtectedRoute;




import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    if (payload.exp < currentTime) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

  } catch (err) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;