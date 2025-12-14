import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutButton = ({ className = "" }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
    } finally {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`group relative bg-white/80 backdrop-blur-xl text-amber-800 border-2 border-amber-200/60 hover:bg-linear-to-r hover:from-amber-50/90 hover:to-orange-50/90 hover:border-amber-400/70 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 font-bold shadow-xl px-6 py-4 rounded-3xl flex items-center gap-3 overflow-hidden ${className}`}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-amber-400/20 via-white/10 to-amber-400/20 -skew-x-12 -rotate-2 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none rounded-3xl"></div>
      
      {/* Floating orb */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-linear-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700 -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
      
      {/* Icon container */}
      <div className="relative p-2 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl shadow-lg border border-amber-200/50 group-hover:scale-110 transition-all duration-500 group-hover:bg-linear-to-br group-hover:from-amber-200 group-hover:to-orange-200">
        <svg 
          className="w-6 h-6 text-amber-700 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110 drop-shadow-lg" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>
      
      <span className="relative bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
        Logout
      </span>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-amber-400 via-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-700 mx-4 rounded-t-full shadow-2xl"></div>
    </button>
  );
};

export default LogoutButton;
