import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "./Outlet";
import { Sidebar } from "./Sidebar";
import { AuthComponent } from "../Auth/AuthComponent";

export const AdminLayoyt = () => {
  return (
    <AuthComponent>
      <div className="d-flex">
        <div
          className="left bg-dark text-light px-3"
          style={{ width: "200px" }}
        >
          <div className="py-3">Admin CMS</div>
          <hr />
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
