import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { AuthComponent } from "../Auth/AuthComponent";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <AuthComponent>
      <div className="d-flex">
        <div
          className="left bg-dark text-light px-3"
          style={{ width: "200px" }}
        >
          <div className="py-3 text-center">
            Admin CMS
            <hr />
          </div>
          <Sidebar />
        </div>
        <div className="right flex-grow-1">
          <Header />

          <main className="main p-2" style={{ minHeight: "80vh" }}>
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </AuthComponent>
  );
};
