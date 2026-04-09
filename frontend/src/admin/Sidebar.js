import React from "react";
import {  Link } from "react-router-dom";
import "./adminLayout.css";
import { FaHome, FaCalendarAlt, FaUsers, FaCog } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      <h2 className="logo">{collapsed ? "" : "Admin"}</h2>

      <ul className="menu">
        <li>
          <Link to="/admin/dashboard">
          <FaHome className="icon" />
          {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>

        <li>
            <Link to="/admin/dashboard/block-slot">
            <FaCalendarAlt className="icon" />
            {!collapsed && <span>Block Slots</span>}
            </Link>

        </li>

        <li>
           <Link to="/admin/dashboard/management">
          <FaUsers className="icon" />
          {!collapsed && <span>Management</span>}
          </Link>
        </li>

        <li>
          <Link to = "/admin/dashboard/reports">
          <FaChartBar className="icon" />
          {!collapsed && <span>Reports & Analysis</span>}
          </Link>
        </li>
      </ul>

      {/* 🔴 Logout Button */}
      <div className="logout-section" onClick={handleLogout}>
        <FaSignOutAlt className="icon" />
        {!collapsed && <span>Logout</span>}
      </div>

    </div>
  );
};

export default Sidebar;