import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import type { User } from '../../types/user';
import { useCartStore } from '../../store/cartStore';
import { ProfileDropdown } from './ProfileDropdown';

const getStoredUser = (): User => {
  const stored = localStorage.getItem('user');
  return stored
    ? (JSON.parse(stored) as User)
    : { id: 'USR-8021', name: 'Seller', email: 'Seller1@asrii.com', role: 'seller' };
};

interface NavbarProps {
  onMenuClick: () => void;
  variant?: 'dashboard' | 'buyer';
}

const getDashboardTitle = (role: string) => {
  switch (role) {
    case 'admin': return 'Dashboard Admin';
    case 'buyer': return 'Dashboard Buyer';
    case 'driver': return 'Dashboard Driver';
    case 'validator': return 'Dashboard Validator';
    default: return 'Dashboard Seller';
  }
};

export const Navbar = ({ onMenuClick, variant = 'dashboard' }: NavbarProps) => {
  const [user] = useState<User>(getStoredUser);
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <nav className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-primary/10 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all active:scale-95"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
        <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
          {getDashboardTitle(user.role || 'seller')}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {variant === 'buyer' && (
          <Link
            to="/buyer/cart"
            className="relative flex items-center justify-center rounded-lg p-2 text-neutral transition-colors hover:bg-primary/5"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
        )}
        <ProfileDropdown user={user} fallbackName={variant === 'buyer' ? 'Buyer' : 'User'} />
      </div>
    </nav>
  );
};

export default Navbar;
