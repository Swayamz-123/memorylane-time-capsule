import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutButton = ({ className = "" }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ${className}`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
