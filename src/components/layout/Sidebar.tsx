import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import logo from '../../assets/img/logo-asri-1.webp';

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  logoTo?: string;
  footerText?: string;
  showLogo?: boolean;
}

export const Sidebar = ({
  isOpen,
  onClose,
  navItems,
  logoTo = '/',
  footerText = 'ASRI v1.0.0',
  showLogo = true,
}: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-primary/10 bg-white transition-all duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {showLogo && (
          <div className="flex h-14 items-center justify-center border-b border-primary/10 sm:h-16">
            <Link to={logoTo} onClick={onClose}>
              <img src={logo} alt="ASRI" className="h-8 w-auto transition-transform hover:scale-105" />
            </Link>
          </div>
        )}

        <nav className={`flex-1 space-y-1 p-4 ${showLogo ? '' : 'pt-6 sm:pt-8'}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary text-white shadow-sm shadow-secondary/30'
                    : 'text-neutral hover:bg-primary/5 hover:pl-4'
                }`}
              >
                <item.icon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isActive ? '' : 'group-hover:scale-110'
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-primary/10 p-4">
          <p className="text-center text-xs text-neutral/30">{footerText}</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
