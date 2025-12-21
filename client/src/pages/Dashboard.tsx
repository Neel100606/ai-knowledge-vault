import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // clear token / user data
    navigate("/login");    // redirect to login page
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <p>You are logged in 🎉</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
