import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute - Komponen penjaga rute yang memverifikasi
 * apakah pengguna sudah login (memiliki token di localStorage).
 * Jika tidak, pengguna diarahkan ke halaman login.
 */
export const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
