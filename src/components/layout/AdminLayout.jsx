import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { AuthComponent } from "../Auth/AuthComponent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AdminLayout = () => {
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
          {/* <Header /> */}
          <div className="px-6 py-4 min-h-[90vh] ml-16 md:ml-52">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </AuthComponent>
  );
};
