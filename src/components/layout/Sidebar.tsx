import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import toast from 'react-hot-toast';
import { memo, useCallback } from 'react';
import Icon from '../ui/Icon';
import logo from '../../assets/img/logo-asri-optimized.webp';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { label: 'Analisis', icon: 'analytics', to: '/dashboard/analytics' },
  { label: 'Inventori', icon: 'inventory_2', to: '/dashboard/inventory' },
  { label: 'Transaksi', icon: 'account_balance_wallet', to: '/dashboard/transactions' },
  { label: 'Laporan', icon: 'description', to: '/dashboard/reports' },
];

export const Sidebar = memo(({ isOpen, onClose }: SidebarProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    authService.logout();
    toast.success('Berhasil keluar!');
    window.location.href = '/login';
  }, []);

  // Navigasi instan
  const handleNavClick = useCallback((to: string) => {
    // Tutup sidebar dulu di mobile
    if (window.innerWidth < 768) {
      onClose();
    }
    navigate(to);
  }, [onClose, navigate]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary text-white font-label-sm text-label-sm border-r border-white/10 p-4 gap-stack-unit transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-white/10">
          <img
            alt="ASRI Logo"
            className="w-10 h-10 rounded-full object-cover border border-white/20"
            src={logo}
            loading="eager"
            decoding="async"
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md text-white">Ekosistem ASRI</span>
            <span className="text-white/60 text-xs">Kepercayaan Ekologis</span>
          </div>
        </div>

        {/* Navigation - pakai button + navigate, bukan Link */}
        <nav className="flex flex-col gap-1 flex-grow mt-6">
          {navItems.map((item) => {
            const isActive = pathname === item.to || (item.to === '/dashboard' && pathname === '/dashboard/');
            return (
              <button
                key={item.to}
                onClick={() => handleNavClick(item.to)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left cursor-pointer w-full ${
                  isActive
                    ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/20'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon name={item.icon} size={20} className={isActive ? 'text-white' : 'text-white/70'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="px-4 mt-auto mb-4">
          <button className="w-full bg-white text-primary text-center py-3 rounded-lg font-bold hover:bg-tertiary cursor-pointer active:scale-95">
            Transaksi Baru
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 flex flex-col gap-1">
          <a
            className="flex items-center gap-3 px-4 py-2 text-white/70 hover:bg-white/10 hover:text-white rounded-lg"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <Icon name="help" size={20} className="text-white/70" />
            <span>Pusat Bantuan</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-left text-white/70 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer"
          >
            <Icon name="logout" size={20} className="text-white/70" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
