import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbSitemap, TbCube } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUser, FaUserSecret } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import watch_logo from "../../assets/images/watch_logo.png";

export const Sidebar = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const handleSignOut = () => {
    dispatch(setUser({}));
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");
  };

  const inputs = [
    {
      title: "Dashboard",
      to: "/admin/dashboard",
      icon: <LuLayoutDashboard />,
    },
    {
      title: "Categories",
      to: "/admin/categories",
      icon: <TbSitemap />,
    },
    {
      title: "Products",
      to: "/admin/products",
      icon: <TbCube />,
    },
    {
      title: "Users",
      to: "/admin/users",
      icon: <PiUsersThree />,
    },
    {
      title: "Orders",
      to: "/admin/orders",
      icon: <FcSalesPerformance />,
    },
    {
      title: "Reviews",
      to: "/admin/reviews",
      icon: <AiOutlineMessage />,
    },
  ];

  return (
    <div className="bg-gray-800 text-gray-300 px-3 w-16 md:min-w-60 fixed h-screen top-0 font-bold flex flex-col overflow-auto">
      <Link
        to={"/"}
        className="text-lg mt-4 mb-16 md:flex md:gap-2 items-center"
      >
        <img src={watch_logo} alt="" className="w-7 h-7" />
        <span className="hidden md:inline">Admin CMS</span>
      </Link>

      <div className="h-full flex flex-col justify-between pb-8 gap-8">
        <div className="space-y-8">
          {inputs.map(({ to, icon, title }) => (
            <Link
              key={title}
              className={`flex p-2 rounded-lg hover:bg-gray-700 hover:text-orange-500 transition-colors gap-3 ${
                location?.pathname === to ? "bg-gray-700" : ""
              }`}
              to={to}
            >
              <span className="text-xl">{icon}</span>
              <span className="hidden md:inline">{title}</span>
            </Link>
          ))}
        </div>
        <div className="space-y-8">
          <Link
            className={`flex p-2 rounded-lg hover:bg-gray-700 hover:text-orange-500 transition-colors gap-3 ${
              location?.pathname === "/admin/profile" ? "bg-gray-700" : ""
            }`}
            to={"/admin/profile"}
          >
            <span className="text-xl">
              <FaUserSecret />
            </span>
            <span className="hidden md:inline">Profile</span>
          </Link>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-700 hover:text-orange-500 transition-colors gap-3">
            <span className="text-xl">
              <FaUser />
            </span>
            <button onClick={handleSignOut} className="hidden md:inline">
              Signout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
