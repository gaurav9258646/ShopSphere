import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaList,
  FaBoxOpen,
  FaImages,
  FaShoppingCart,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <FaList />,
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaBoxOpen />,
  },
  {
    title: "Product Images",
    path: "/product-images",
    icon: <FaImages />,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <FaShoppingCart />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <FaUsers />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-lg">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-center text-blue-400">
          ShopSphere
        </h1>
      </div>

      <nav className="mt-5 px-3">

        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <span className="text-lg">{menu.icon}</span>
            <span>{menu.title}</span>
          </NavLink>
        ))}

      </nav>
    </aside>
  );
};

export default Sidebar;