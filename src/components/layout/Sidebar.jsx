import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbSitemap, TbCube } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUser, FaUserSecret } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

export const Sidebar = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location);

  const handleSignOut = () => {
    dispatch(setUser({}));
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");
  };

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
    <div className="bg-gray-800 text-gray-300 px-3 w-16 md:min-w-52 pt-8 fixed h-screen top-0 font-bold flex flex-col">
      <Link to={"/"} className="pb-7 pt-3 text-center hidden md:block text-lg">
        ADMIN CMS
      </Link>

      <div className="h-full flex flex-col justify-between pb-8">
        <div className="space-y-8">
          <hr />
          {inputs.map(({ to, icon, title }) => (
            <Link
              key={title}
              className={`flex items-center p-3 rounded-lg hover:bg-gray-700 hover:text-orange-500 transition-colors gap-3 ${
                location?.pathname === "/" + to ? "bg-gray-700" : ""
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
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 hover:text-orange-500 transition-colors gap-3"
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
            <button onClick={handleSignOut}>Signout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
