import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import type { User } from '../../types/user';
import textAndLogo from '../../assets/img/logo-asri-2.webp';
import { ProfileDropdown } from './ProfileDropdown';

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? (JSON.parse(stored) as User) : null;
};

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [user] = useState<User | null>(getStoredUser);

  return (
    <nav className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 border-b border-primary/10 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center rounded-lg p-1.5 text-neutral hover:bg-primary/5 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link to="/dashboard" className="flex items-center">
          <img src={textAndLogo} alt="ASRI" className="h-7 sm:h-10 w-auto" />
        </Link>
      </div>

      <ProfileDropdown user={user} />
    </nav>
  );
};

export default Navbar;
