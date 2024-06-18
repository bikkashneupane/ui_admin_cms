import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Register } from "./pages/user/Register";
import { Login } from "./pages/user/Login";
import { UserVerification } from "./pages/user/UserVerification";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-user" element={<UserVerification />} />

        {/* private path */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/admin/new" element={<Register />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
