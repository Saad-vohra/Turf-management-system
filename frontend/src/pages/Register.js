// import React, { useState } from "react";
// import { registerUser } from "../services/authService";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(formData);
//       //alert("Registration Successful");
//       navigate("/home"); // ✅ redirect to home
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Register</button>
//       </form>

//       <p>
//         Already have an account?{" "}
//         <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "../components/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">🏟️ Turf Registration</h2>
        <p className="register-subtitle">
          Book your turf slots easily
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

