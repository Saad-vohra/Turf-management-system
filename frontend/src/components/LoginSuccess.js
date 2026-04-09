// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginSuccess.css";

// const LoginSuccess = () => {

//   const navigate = useNavigate();

//   useEffect(() => {

//     const timer = setTimeout(() => {
//       navigate("/home");
//     }, 2500);

//     return () => clearTimeout(timer);

//   }, [navigate]);

//   return (
//     <div className="success-container">

//       <h2 className="success-text">Login Successful</h2>

//       <div className="animation-area">

//         <div className="bat">🏏</div>
//         <div className="ball">⚾</div>

//       </div>

//       <p>Welcome back! Taking you to the dashboard...</p>

//     </div>
//   );
// };

// export default LoginSuccess;







// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import cricketAnimation from "../assets/Rohit Sharma Pull Shot.json";

// const LoginSuccess = () => {

//   const navigate = useNavigate();

//   useEffect(() => {

//     const timer = setTimeout(() => {
//       navigate("/home");
//     }, 3000);

//     return () => clearTimeout(timer);

//   }, [navigate]);

//   return (
//     <div
//       style={{
//         height: "100vh",
//         background: "#0f172a",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column"
//       }}
//     >

//       <Lottie
//         animationData={cricketAnimation}
//         style={{ width: 400 }}
//       />

//       <h2 style={{color:"white"}}>Welcome to Turf Arena</h2>

//     </div>
//   );
// };

// export default LoginSuccess;







import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import cricketAnimation from "../assets/Rohit Sharma Pull Shot.json";
import "./LoginSuccess.css";

const LoginSuccess = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="login-success-container">

      <Lottie
        animationData={cricketAnimation}
        className="cricket-fullscreen"
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice"
        }}
      />

      <h2 className="welcome-text">Welcome to Turf Arena</h2>

    </div>
  );
};

export default LoginSuccess;