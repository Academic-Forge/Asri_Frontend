import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/layout/dashboard';
import CariProduk from '../pages/buyer/produk/CariProduk';
import DetailProduk from '../pages/buyer/produk/DetailProduk';
import Checkout from '../pages/buyer/checkout/Checkout';
import Pengiriman from '../pages/buyer/checkout/Pengiriman';
import Pembayaran from '../pages/buyer/checkout/Pembayaran';
import Cart from '../pages/buyer/checkout/Cart';
import RiwayatPesanan from '../pages/buyer/pesanan/RiwayatPesanan';
import PesananSaya from '../pages/buyer/pesanan/PesananSaya';

/**
 * Routing configuration for ASRI.
 */
export const router = createBrowserRouter([
  {
    path: '/',
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
    ],
  },
  {
    path: '/buyer',
    element: <DashboardLayout variant="buyer" />,
    children: [
      {
        index: true,
        element: <Navigate to="/buyer/search" replace />,
      },
      {
        path: 'search',
        element: <CariProduk />,
      },
      {
        path: 'product/:slug',
        element: <DetailProduk />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'checkout/shipping',
        element: <Pengiriman />,
      },
      {
        path: 'checkout/payment',
        element: <Pembayaran />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'history',
        element: <RiwayatPesanan />,
      },
      {
        path: 'orders',
        element: <PesananSaya />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
