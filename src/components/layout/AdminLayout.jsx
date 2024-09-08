import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { AuthComponent } from "../Auth/AuthComponent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const AdminLayout = () => {
  const { minimiseSideBar } = useSelector((state) => state.systemInfo);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(location?.pathname);
  }, [navigate, location?.pathname]);

  return (
    <AuthComponent>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <div
            className={`px-6 py-4 min-h-[100vh] ${
              minimiseSideBar ? "ml-16" : "ml-60"
            }`}
          >
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </AuthComponent>
  );
};
