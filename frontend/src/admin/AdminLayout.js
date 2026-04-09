import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./adminLayout.css";

const AdminLayout = ({ children }) => {
  // 🔑 State to control sidebar
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`admin-layout ${collapsed ? "collapsed" : ""}`}>
      
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Section */}
      <div className="admin-main">
        
        {/* Topbar */}
        <Topbar toggleSidebar={() => setCollapsed(!collapsed)} />

        {/* Page Content */}
        <div className="admin-content">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;