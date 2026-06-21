import { useState } from 'react';
import type { User } from '../../types/user';
import { ProfileDropdown } from './ProfileDropdown';
import { memo } from 'react';
import Icon from '../ui/Icon';

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? (JSON.parse(stored) as User) : null;
};

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = memo(({ onMenuClick }: NavbarProps) => {
  const [user] = useState<User | null>(getStoredUser);

  const isValidator = user?.role === 'validator';
  const searchPlaceholder = isValidator ? 'Cari verifikasi...' : 'Cari jaringan...';

  return (
    <header className="bg-surface text-primary font-body-md text-body-md w-full h-16 border-b border-outline-variant flex justify-between items-center px-4 md:px-margin-desktop sticky top-0 z-40">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container-low md:hidden cursor-pointer"
        >
          <Icon name="menu" size={20} className="text-on-surface-variant" />
        </button>

        <div className="md:hidden flex items-center">
          <span className="font-headline-md text-headline-md font-bold text-primary">ASRI</span>
        </div>

        <div className="relative hidden sm:block">
          <Icon
            name="search"
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant opacity-50"
          />
          <input
            className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary w-64"
            placeholder={searchPlaceholder}
            type="text"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-low cursor-pointer active:opacity-80 rounded-full">
          <Icon name="notifications" size={20} className="text-on-surface-variant" />
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container-low cursor-pointer active:opacity-80 rounded-full">
          <Icon name="settings" size={20} className="text-on-surface-variant" />
        </button>

        <div className="ml-1 sm:ml-2">
          <ProfileDropdown user={user} />
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
