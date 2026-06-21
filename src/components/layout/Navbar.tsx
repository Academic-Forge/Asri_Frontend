import { useState } from 'react';
import { Menu } from 'lucide-react';
import type { User } from '../../types/user';
import { ProfileDropdown } from './ProfileDropdown';

const getStoredUser = (): User => {
  const stored = localStorage.getItem('user');
  return stored
    ? (JSON.parse(stored) as User)
    : { id: 'USR-8021', name: 'Seller', email: 'Seller1@asrii.com', role: 'seller' };
};

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [user] = useState<User>(getStoredUser);

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
        <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">Dashboard Seller</span>
      </div>

      <ProfileDropdown user={user} />
    </nav>
  );
};

export default Navbar;
