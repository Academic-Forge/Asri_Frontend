import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import type { User as UserType } from '../../types/user';
import defaultAvatar from '../../assets/default-avatar.jpg';

interface ProfileDropdownProps {
  user: UserType | null;
  fallbackName?: string;
}

export const ProfileDropdown = ({ user, fallbackName = 'User' }: ProfileDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-xl p-2 transition-colors hover:bg-primary/5 active:scale-95 cursor-pointer"
      >
        <img
          src={user?.avatar || defaultAvatar}
          alt={user?.name ?? fallbackName}
          className="h-9 sm:h-11 w-9 sm:w-11 rounded-full object-cover border-2 border-primary/20 transition-shadow hover:border-secondary/50 shadow-sm"
        />
        <span className="hidden sm:inline text-sm sm:text-base font-bold text-neutral">
          {user?.name ?? fallbackName}
        </span>
        <ChevronDown
          className={`hidden sm:block h-4.5 w-4.5 sm:h-5 sm:w-5 text-neutral/50 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-64 animate-slide-down rounded-xl border border-primary/10 bg-white p-4 shadow-lg ring-1 ring-black/5">
          <div className="flex items-center gap-3 border-b border-primary/10 pb-3">
            <img
              src={user?.avatar || defaultAvatar}
              alt={user?.name ?? fallbackName}
              className="h-12 w-12 rounded-full object-cover border-2 border-primary/20 shadow-sm"
            />
            <div className="min-w-0">
              <p className="truncate text-sm sm:text-base font-bold text-neutral">
                {user?.name ?? fallbackName}
              </p>
              <p className="truncate text-xs sm:text-sm text-neutral/50">
                {user?.email ?? '-'}
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <button
              onClick={() => {
                setOpen(false);
                navigate('/dashboard/user/data-user');
              }}
              className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-neutral transition-all hover:bg-primary/5 hover:pl-5 active:scale-[0.98] cursor-pointer"
            >
              <User className="h-5 w-5 text-neutral/40" />
              Keterangan Akun
            </button>
            <button
              onClick={() => {
                setOpen(false);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                toast.success('Berhasil keluar!');
                navigate('/login');
              }}
              className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm sm:text-base font-bold text-red-600 transition-all hover:bg-red-50 hover:pl-5 active:scale-[0.98] cursor-pointer"
            >
              <LogOut className="h-5 w-5 text-red-400" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
