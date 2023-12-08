import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "./components/RootLayout";
import "./App.scss";

//route control
import UserRoutes from "./components/routeControls/UserRoutes";
import AdminRoutes from "./components/routeControls/AdminRoutes";
import RouteUsers from "./components/routeControls/RouteUsers";

//auth routes
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

// view routes
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import SearchProduct from "./pages/SearchProduct";

//admin routes
import ProductList from "./pages/adminPages/ProductList";
import AddProduct from "./pages/adminPages/AddProduct";
import EditProduct from "./pages/adminPages/EditProduct";
import AdminProfile from "./pages/adminPages/AdminProfile";
import AdminOrderDetail from "./pages/adminPages/AdminOrderDetail.jsx";

//user routes
import CartPage from "./pages/userPages/CartPage";
import Shipping from "./pages/userPages/Shipping";
import OrderPage from "./pages/userPages/OrderPage";
import UserProfile from "./pages/userPages/UserProfile";
import OrderDetail from "./pages/userPages/OrderDetail";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="productDetail/:id" element={<ProductDetail />} />
          <Route path="searchProduct/:search" element={<SearchProduct />} />

          <Route element={<RouteUsers />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="allProducts" element={<ProductList />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="editProduct/:id" element={<EditProduct />} />
            <Route path="admin/allDetail" element={<AdminProfile />} />
            <Route path="admin/adminOrder/:id" element={<AdminOrderDetail />} />
          </Route>

          <Route element={<UserRoutes />}>
            <Route path="user/cart" element={<CartPage />} />
            <Route path="user/shipping" element={<Shipping />} />
            <Route path="user/checkout" element={<OrderPage />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/order/:id" element={<OrderDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1200} />
    </>
  );
};

export default App;
