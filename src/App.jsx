import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Register } from "./pages/user/Register";
import { Login } from "./pages/user/Login";
import { UserVerification } from "./pages/user/UserVerification";
import { Categories } from "./pages/category/Categories";
import { Products } from "./pages/product/Products";
import { Admins } from "./pages/user/Admins";
import { Reviews } from "./pages/review/Reviews";
import { Profile } from "./pages/user/Profile";
import { Orders } from "./pages/order/Orders";
import { Users } from "./pages/user/Users";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLoginAction } from "./features/user/userAction";
import { ForgetPassword } from "./pages/user/ForgetPassword";
import { AdminLayout } from "./components/layout/AdminLayout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginAction());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-user" element={<UserVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* private path */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="admin/new" element={<Register />} />
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/categories" element={<Categories />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/reviews" element={<Reviews />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/admins" element={<Admins />} />
          <Route path="admin/profile" element={<Profile />} />
        </Route>

        {/* 404 Path Not Found */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
