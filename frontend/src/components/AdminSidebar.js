import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-sidebar">
      <h2>ADMIN</h2>
      <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
      <button onClick={logout} className="logout">Logout</button>
    </div>
  );
}
