import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import Dashboard from '../pages/layout/dashboard';
import PlaceholderPage from '../pages/layout/PlaceholderPage';

// Hanya lazy-load halaman auth (jarang diakses setelah login)
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));

const AuthLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-7 h-7 border-3 border-secondary border-t-transparent rounded-full animate-spin" />
  </div>
);

/**
 * Konfigurasi routing ASRI.
 * Dashboard pages di-import langsung (eager) supaya navigasi instan.
 * Halaman auth di-lazy load karena hanya diakses sekali.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Suspense fallback={<AuthLoader />}><Login /></Suspense>,
  },
  {
    path: '/register',
    element: <Suspense fallback={<AuthLoader />}><Register /></Suspense>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'analytics',
            element: <PlaceholderPage name="Analisis" icon="analytics" />,
          },
          {
            path: 'inventory',
            element: <PlaceholderPage name="Inventori" icon="inventory_2" />,
          },
          {
            path: 'transactions',
            element: <PlaceholderPage name="Transaksi" icon="account_balance_wallet" />,
          },
          {
            path: 'reports',
            element: <PlaceholderPage name="Laporan" icon="description" />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
