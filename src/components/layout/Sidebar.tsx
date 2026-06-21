import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Package, 
  Boxes, 
  ClipboardList,
  User as UserIcon,
  LogOut,
  Truck,
  ShieldCheck,
  UserCheck,
  Search,
  Clock,
  ShoppingCart,
  type LucideIcon
} from 'lucide-react';
import toast from 'react-hot-toast';
import logo from '../../assets/img/logo-asri-1.webp';
import type { User } from '../../types/user';

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: NavItem[];
  logoTo?: string;
  footerText?: string;
  showLogo?: boolean;
}

const getStoredUser = (): User => {
  const stored = localStorage.getItem('user');
  return stored
    ? (JSON.parse(stored) as User)
    : { id: 'USR-8021', name: 'Seller', email: 'Seller1@asrii.com', role: 'seller' };
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const MENU_BY_ROLE = {
  admin: [
    { type: 'item', label: 'Dashboard Admin', icon: LayoutDashboard, to: '/dashboard/admin' },
    { type: 'header', label: 'Manajemen', icon: null, to: '' },
    { type: 'item', label: 'Verifikasi Seller', icon: UserCheck, to: '/dashboard/admin/verifikasi' },
  ],
  seller: [
    { type: 'item', label: 'Dashboard Seller', icon: LayoutDashboard, to: '/dashboard' },
    { type: 'header', label: 'Menu Seller', icon: null, to: '' },
    { type: 'item', label: 'Buat Toko', icon: Store, to: '/dashboard/seller/toko/create' },
    { type: 'item', label: 'Kelola Produk', icon: Package, to: '/dashboard/seller/produk' },
    { type: 'item', label: 'Kelola Stok', icon: Boxes, to: '/dashboard/seller/stok' },
    { type: 'item', label: 'Lihat Pesanan', icon: ClipboardList, to: '/dashboard/seller/pesanan' },
  ],
  buyer: [
    { type: 'item', label: 'Cari Produk', icon: Search, to: '/buyer/search' },
    { type: 'item', label: 'Riwayat Pesanan', icon: Clock, to: '/buyer/history' },
    { type: 'item', label: 'Keranjang', icon: ShoppingCart, to: '/buyer/cart' },
    { type: 'item', label: 'Pesanan Saya', icon: Package, to: '/buyer/orders' },
  ],
  driver: [
    { type: 'item', label: 'Dashboard Driver', icon: LayoutDashboard, to: '/dashboard/driver' },
    { type: 'header', label: 'Menu Kurir', icon: null, to: '' },
    { type: 'item', label: 'Ambil Antrean', icon: Truck, to: '/dashboard/driver/queue' },
    { type: 'item', label: 'Pengantaran Aktif', icon: ClipboardList, to: '/dashboard/driver/deliveries' },
  ],
  validator: [
    { type: 'item', label: 'Dashboard Validator', icon: LayoutDashboard, to: '/dashboard/validator' },
    { type: 'header', label: 'Menu Validator', icon: null, to: '' },
    { type: 'item', label: 'Daftar Antrean', icon: ClipboardList, to: '/dashboard/validator/queue' },
    { type: 'item', label: 'Hasil Inspeksi', icon: ShieldCheck, to: '/dashboard/validator/inspections' },
  ],
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();
  const role = user.role || 'seller'; // Default fallback to seller
  const isBuyer = role === 'buyer';
  const logoTo = isBuyer ? '/buyer/search' : '/dashboard';
  const showLogo = true;

  // Resolve dynamic nav items based on role
  const roleNavItems = MENU_BY_ROLE[role] || MENU_BY_ROLE['seller'];

  const settingsNavItems = [
    { type: 'header', label: 'Pengaturan', icon: null, to: '' },
    { type: 'item', label: 'Profil Saya', icon: UserIcon, to: '/dashboard/user/data-user' },
  ];

  const activeNavItems = [...roleNavItems, ...settingsNavItems];

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Berhasil keluar!');
    navigate('/login');
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-emerald-950/20 bg-[#022c22] transition-all duration-300 lg:sticky lg:top-0 lg:h-screen ${
          isOpen
            ? 'w-64 translate-x-0 opacity-100'
            : 'w-64 -translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:overflow-hidden lg:border-r-0'
        }`}
      >
        {showLogo && (
          <div className="flex h-16 items-center justify-start px-6 border-b border-white/5 sm:h-20 gap-3">
            <Link to={logoTo} onClick={handleLinkClick} className="flex items-center gap-3">
              <img src={logo} alt="ASRI" className="h-9 w-auto transition-transform hover:scale-105 filter brightness-110" />
              <span className="font-extrabold text-2xl text-white tracking-wider">ASRI</span>
            </Link>
          </div>
        )}

        <nav className={`flex-1 space-y-1 p-3 ${showLogo ? '' : 'pt-6 sm:pt-8'}`}>
          {activeNavItems.map((item, index) => {
            if (item.type === 'header') {
              return (
                <div
                  key={`header-${index}`}
                  className="pt-4 pb-1 px-3 text-[10px] font-extrabold text-emerald-400/50 uppercase tracking-widest"
                >
                  {item.label}
                </div>
              );
            }
            const isActive = pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleLinkClick}
                className={`group flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm sm:text-base font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary text-white shadow-md shadow-secondary/20'
                    : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {Icon && (
                  <Icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 ${
                      isActive ? 'text-white' : 'text-emerald-300/50 group-hover:text-white'
                    }`}
                  />
                )}
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-5 flex items-center justify-between gap-3 bg-emerald-950/25">
          <div className="flex items-center gap-3.5 min-w-0">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                {getInitials(user.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate leading-none">{user.name}</p>
              <p className="text-xs text-emerald-400 font-extrabold mt-1.5 tracking-wider leading-none uppercase">{role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2.5 hover:bg-white/10 text-emerald-300 hover:text-white rounded-xl transition-colors cursor-pointer shrink-0"
            title="Keluar"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
