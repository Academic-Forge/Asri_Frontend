import { useState, useRef, useEffect } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import type { User as UserType } from '../../types/user';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';
import defaultAvatar from '../../assets/default-avatar.jpg';

interface ProfileDropdownProps {
  user: UserType | null;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    toast.success('Berhasil keluar!');
    window.location.href = '/login';
  };

  // Map role ke label Bahasa Indonesia
  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'validator': return 'Validator';
      case 'buyer': return 'Pembeli';
      case 'seller': return 'Penjual';
      case 'driver': return 'Pengemudi';
      default: return 'Pengguna';
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-primary/5 active:scale-95 cursor-pointer"
      >
        <img
          src={defaultAvatar}
          alt={user?.name ?? 'Pengguna'}
          className="h-8 sm:h-9 w-8 sm:w-9 rounded-full object-cover border-2 border-primary/20 transition-shadow hover:border-secondary/50"
          decoding="async"
        />
        <span className="hidden sm:inline text-sm font-semibold text-neutral">
          {user?.name ?? 'Pengguna'}
        </span>
        <ChevronDown
          className={`hidden sm:block h-4 w-4 text-neutral/50 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-64 animate-slide-down rounded-xl border border-primary/10 bg-white p-4 shadow-lg ring-1 ring-black/5">
          <div className="flex items-center gap-3 border-b border-primary/10 pb-3">
            <img
              src={defaultAvatar}
              alt={user?.name ?? 'Pengguna'}
              className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
              decoding="async"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral">
                {user?.name ?? 'Pengguna'}
              </p>
              <p className="truncate text-xs text-neutral/50">
                {user?.email ?? '-'}
              </p>
              <p className="text-[10px] text-secondary font-bold mt-0.5">
                {getRoleLabel(user?.role)}
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral transition-all hover:bg-primary/5 hover:pl-4 active:scale-[0.98] cursor-pointer">
              <User className="h-4 w-4" />
              Profil Akun
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:pl-4 active:scale-[0.98] cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
