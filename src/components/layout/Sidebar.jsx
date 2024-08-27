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
  ];

  return (
    <div className="bg-gray-900 text-gray-400 px-3 w-16 md:min-w-52 pt-8 fixed top-0 min-h-screen">
      <div className="h-full">
        <Link
          to={"/"}
          className="pb-10 text-center hidden md:block text-lg font-semibold"
        >
          ADMIN CMS
        </Link>

        <div className="space-y-4">
          <hr />
          {inputs.map(({ to, icon, title }) => (
            <Link
              key={title}
              className="flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-orange-500 transition-colors gap-3"
              to={to}
            >
              <span className="text-xl">{icon}</span>
              <span className="hidden md:inline">{title}</span>
            </Link>
          ))}
        </div>
        <Link
          className="flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-orange-500 transition-colors gap-3 mt-20"
          to={"/admin/profile"}
        >
          <span className="text-xl">
            <FaUserSecret />
          </span>
          <span className="hidden md:inline">Profile</span>
        </Link>
      </div>
    </div>
  );
};
