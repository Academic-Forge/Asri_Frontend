import { useState, useRef, useEffect } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import type { User as UserType } from '../../types/user';
import defaultAvatar from '../../assets/default-avatar.jpg';

interface ProfileDropdownProps {
  user: UserType | null;
  fallbackName?: string;
}

export const ProfileDropdown = ({ user, fallbackName = 'User' }: ProfileDropdownProps) => {
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-primary/5 active:scale-95"
      >
        <img
          src={defaultAvatar}
          alt={user?.name ?? fallbackName}
          className="h-8 sm:h-9 w-8 sm:w-9 rounded-full object-cover border-2 border-primary/20 transition-shadow hover:border-secondary/50"
        />
        <span className="hidden sm:inline text-sm font-semibold text-neutral">
          {user?.name ?? fallbackName}
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
              alt={user?.name ?? fallbackName}
              className="h-10 w-10 rounded-full object-cover border-2 border-primary/20"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral">
                {user?.name ?? fallbackName}
              </p>
              <p className="truncate text-xs text-neutral/50">
                {user?.email ?? '-'}
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral transition-all hover:bg-primary/5 hover:pl-4 active:scale-[0.98]">
              <User className="h-4 w-4" />
              Keterangan Akun
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 hover:pl-4 active:scale-[0.98]">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
