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
import { Reviews } from "./pages/review/Reviews";
import { Profile } from "./pages/user/Profile";
import { Orders } from "./pages/order/Orders";
import { Users } from "./pages/user/Users";
import { ForgetPassword } from "./pages/user/ForgetPassword";
import { AdminLayout } from "./components/layout/AdminLayout";
import { EditProduct } from "./pages/product/EditProduct";
import { AddNewProduct } from "./pages/product/AddNewProduct";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-account" element={<UserVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* private path */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/categories" element={<Categories />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/products/add" element={<AddNewProduct />} />
          <Route path="admin/products/edit" element={<EditProduct />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/reviews" element={<Reviews />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/profile" element={<Profile />} />
          <Route path="admin/new" element={<Register />} />
        </Route>

        {/* 404 Path Not Found */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer
        position="top-right"
        stacked
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        newestOnTop={true}
      />
    </>
  );
}

export default App;
