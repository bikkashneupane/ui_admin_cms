import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbSitemap, TbCube } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUser, FaUserSecret } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import watch_logo from "../../assets/images/watch_logo.png";
import { setMinimiseSideBar } from "../../redux-store/system/systemSlice";

export const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { minimiseSideBar } = useSelector((state) => state.systemInfo);

  const handleSignOut = () => {
    dispatch(setUser({}));
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");
  };

  const handleMinimizeSidebar = (currentPath) => {
    location.pathname === currentPath
      ? dispatch(setMinimiseSideBar(!minimiseSideBar))
      : dispatch(setMinimiseSideBar(false));
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
    <div
      className={`bg-[#1E1E1E] text-gray-300 w-16 ${
        minimiseSideBar ? "" : "lg:w-60"
      } fixed h-screen top-0 font-bold flex flex-col overflow-auto`}
    >
      <Link
        to={"/"}
        className="text-lg mt-4 mb-16 md:flex md:gap-2 items-center flex ps-3"
      >
        <img src={watch_logo} alt="" className="w-10" />
        <span
          className={`hidden lg:inline ${
            minimiseSideBar ? "hidden" : "inline"
          }`}
        >
          Vikiasmy's
        </span>
      </Link>

      <div className="h-full flex flex-col justify-between pb-8 gap-8 px-2">
        <div className="space-y-8">
          {inputs.map(({ to, icon, title }) => (
            <Link
              key={title}
              className={`flex py-2 px-3 rounded hover:bg-[#121212] hover:text-orange-500 transition-colors gap-3 ${
                location?.pathname === to ? "bg-[#121212]" : ""
              }`}
              to={to}
              onClick={() => handleMinimizeSidebar(to)}
            >
              <span className="text-xl">{icon}</span>
              <span
                className={`hidden ${minimiseSideBar ? "hidden" : "lg:inline"}`}
              >
                {title}
              </span>
            </Link>
          ))}
        </div>
        <div className="space-y-8">
          <Link
            className={`flex py-2 px-3 rounded hover:bg-[#121212] hover:text-orange-500 transition-colors gap-3 ${
              location?.pathname === "/admin/profile"
                ? "hover:bg-[#121212]"
                : ""
            }`}
            to={"/admin/profile"}
            onClick={() => handleMinimizeSidebar("/admin/profile")}
          >
            <span className="text-xl">
              <FaUserSecret />
            </span>
            <span
              className={`hidden ${minimiseSideBar ? "hidden" : "lg:inline"}`}
            >
              Profile
            </span>
          </Link>
          <div
            onClick={handleSignOut}
            className="flex items-center py-2 px-3 rounded-md hover:bg-[#121212] hover:text-orange-500 transition-colors gap-3 cursor-pointer"
          >
            <span className="text-xl">
              <FaUser />
            </span>
            <span
              className={`hidden ${minimiseSideBar ? "hidden" : "lg:inline"}`}
            >
              Signout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
