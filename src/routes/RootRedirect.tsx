import { Navigate } from 'react-router-dom';
import type { User } from '../types/user';

export const RootRedirect = () => {
  const stored = localStorage.getItem('user');
  if (!stored) {
    return <Navigate to="/login" replace />;
  }

  let role: string | undefined;
  try {
    const user = JSON.parse(stored) as User;
    role = user.role;
  } catch (e) {
    console.error('Failed to parse user session', e);
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'buyer') {
    return <Navigate to="/buyer/search" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default RootRedirect;
