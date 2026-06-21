import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';

// Seller UI Pages
import CreateStore from '../pages/seller/toko/CreateStore';
import ManageProducts from '../pages/seller/produk/ManageProducts';
import ManageStock from '../pages/seller/stok/ManageStock';
import ViewOrders from '../pages/seller/pesanan/ViewOrders';

// User Settings Page
import UserData from '../pages/user/data-user/UserData';

/**
 * Routing configuration for ASRI.
 * Maps "/", "/login", "/register", and "/dashboard" layout sub-routes.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'seller/toko/create',
        element: <CreateStore />,
      },
      {
        path: 'seller/produk',
        element: <ManageProducts />,
      },
      {
        path: 'seller/stok',
        element: <ManageStock />,
      },
      {
        path: 'seller/pesanan',
        element: <ViewOrders />,
      },
      {
        path: 'user/data-user',
        element: <UserData />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
