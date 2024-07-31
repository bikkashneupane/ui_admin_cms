import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { AuthComponent } from "../Auth/AuthComponent";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <AuthComponent>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          {/* <Header /> */}
          <div className="p-2 min-h-[85vh] bg-gray-100 ml-16 md:ml-52">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </AuthComponent>
  );
};
