import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { AuthComponent } from "../Auth/AuthComponent";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <AuthComponent>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="p-2 min-h-[70vh] w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </AuthComponent>
  );
};
