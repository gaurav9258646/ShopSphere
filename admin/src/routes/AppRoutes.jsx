import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import Category from "../pages/category/Category";
import AddCategory from "../pages/category/AddCategory";
import EditCategory from "../pages/category/EditCategory";

import Product from "../pages/product/Product";
import AddProduct from "../pages/product/AddProduct";
import EditProduct from "../pages/product/EditProduct";

import Orders from "../pages/orders/Orders";
import OrderDetails from "../pages/orders/OrderDetails";

import Users from "../pages/users/Users";
import UserDetails from "../pages/users/UserDetails";
import EditUser from "../pages/users/EditUser";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Categories */}
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/add" element={<AddCategory />} />
        <Route path="/categories/edit/:id" element={<EditCategory />} />

        {/* Products */}
        <Route path="/products" element={<Product />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />

        {/* Users */}
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default AppRoutes;