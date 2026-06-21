import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import type { User } from '../../types/user';
import { useCartStore } from '../../store/cartStore';
import textAndLogo from '../../assets/img/logo-asri-2.webp';
import { ProfileDropdown } from './ProfileDropdown';

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? (JSON.parse(stored) as User) : null;
};

interface NavbarProps {
  onMenuClick: () => void;
  variant?: 'dashboard' | 'buyer';
}

export const Navbar = ({ onMenuClick, variant = 'dashboard' }: NavbarProps) => {
  const [user] = useState<User | null>(getStoredUser);
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <nav className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 border-b border-primary/10 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center rounded-lg p-1.5 text-neutral hover:bg-primary/5 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link
          to={variant === 'buyer' ? '/buyer/search' : '/dashboard'}
          className="flex items-center"
        >
          <img src={textAndLogo} alt="ASRI" className="h-7 sm:h-10 w-auto" />
        </Link>
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
