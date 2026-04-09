// import React from "react";
// import "./adminLayout.css";
// import { FaBars } from "react-icons/fa";

// const Topbar = ({ toggleSidebar }) => {
//   return (
//     <div className="topbar">
      
//       {/* ☰ Hamburger Icon */}
//       <FaBars className="menu-icon" onClick={toggleSidebar} />

//       <h3>Admin Panel</h3>

//     </div>
//   );
// };

// export default Topbar;











import React from "react";
import "./adminLayout.css";
import { FaBars } from "react-icons/fa";

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="topbar">
      
      {/* Left Section */}
      <div className="topbar-left">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        <h3>Admin Panel</h3>
      </div>

      {/* Right Section */}
      <div className="topbar-right">
        <span>Hi, Admin</span>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/40"  // dummy profile image
          alt="profile"
          className="avatar"
        />
      </div>


    </div>
  );
};

export default Topbar;