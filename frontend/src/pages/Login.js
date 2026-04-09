// import React, { useState } from "react";
// import { loginUser } from "../services/authService";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(formData);

//       // save token
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//      // alert("Login Successful");

//       // ✅ role-based redirect
//       if (res.data.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/home");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
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

//         <button type="submit">Login</button>
//       </form>

//       <p>
//         Don’t have an account?{" "}
//         <Link to="/">Register</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { loginUser } from "../services/authService";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(formData);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       if (res.data.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/home");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">🏟️ Turf Login</h2>
//         <p className="login-subtitle">
//           Book football • cricket • box turf
//         </p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />

//           <button className="login-btn" type="submit">
//             Login
//           </button>
//         </form>

//         <p className="register-text">
//           Don’t have an account? <Link to="/">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;







import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "../components/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login-success");
        //navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🏟️ Turf Login</h2>
        <p className="login-subtitle">
          Football • Cricket • Box Turf
        </p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email Address</label>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          Don’t have an account? <Link to="/">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
