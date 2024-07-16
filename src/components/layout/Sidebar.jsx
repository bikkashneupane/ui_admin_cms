import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbSitemap, TbCube } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUserSecret } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";

export const Sidebar = () => {
  const inputs = [
    {
      title: "Dashboard",
      to: "admin/dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      title: "Categories",
      to: "admin/categories",
      icon: <TbSitemap />,
    },
    {
      title: "Products",
      to: "admin/products",
      icon: <TbCube />,
    },
    {
      title: "Users",
      to: "admin/users",
      icon: <PiUsersThree />,
    },
    {
      title: "Orders",
      to: "admin/orders",
      icon: <FcSalesPerformance />,
    },
    {
      title: "Reviews",
      to: "admin/reviews",
      icon: <AiOutlineMessage />,
    },
    {
      title: "Admins",
      to: "admin/admins",
      icon: <FaUserSecret />,
    },
  ];

  return (
    <div className="space-y-4 bg-gray-800 text-gray-400 w-20 px-3 md:w-56">
      {inputs.map(({ to, icon, title }) => (
        <Link
          key={title}
          className="flex items-center p-2 rounded-lg tracking-wider hover:bg-gray-700 hover:text-orange-500 transition-colors"
          to={to}
        >
          <span className="text-xl">{icon}</span>
          <span className="ml-2 hidden md:inline">{title}</span>
        </Link>
      ))}
    </div>
  );
};
