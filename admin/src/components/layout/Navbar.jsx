import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logout } from "../../utils/auth";
import { useSidebar } from "../../context/SidebarContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();

    toast.success("Logout Successfully");

    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 hover:text-blue-600"
        >
          <FaBars />
        </button>

        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent ml-3 outline-none w-full"
          />
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative text-xl text-gray-600 hover:text-blue-600">

          <FaBell />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-blue-600" />

          <div className="hidden md:block">

            <h3 className="font-semibold">
              {user?.name || "Admin"}
            </h3>

            <p className="text-sm text-gray-500">
              {user?.email || "admin@gmail.com"}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;