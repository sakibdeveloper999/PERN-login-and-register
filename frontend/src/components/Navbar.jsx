import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutPopup = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      handleLogout();
    }
  };

  return (
    <div className="w-full px-6 py-4 border-b flex justify-between items-center">

      {/* Left */}
      <div className="text-xl font-bold text-green-600">
        PERN Auth App
      </div>

      {/* Right */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, {user?.name}
            </span>

            <button
              onClick={logoutPopup}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <p onClick={() => navigate("/login")} className="text-green-500 cursor-pointer">
              Login
            </p>
            <span className="text-gray-400">|</span>
            <p onClick={() => navigate("/register")} className="text-green-500 cursor-pointer">
              Register
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;