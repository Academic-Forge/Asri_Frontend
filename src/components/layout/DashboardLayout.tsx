import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutDashboard, Search, Clock, ShoppingCart, Package } from 'lucide-react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  variant?: 'dashboard' | 'buyer';
}

const dashboardItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
];

const buyerItems = [
  { label: 'Cari Produk', icon: Search, to: '/buyer/search' },
  { label: 'Riwayat Pesanan', icon: Clock, to: '/buyer/history' },
  { label: 'Keranjang', icon: ShoppingCart, to: '/buyer/cart' },
  { label: 'Pesanan Saya', icon: Package, to: '/buyer/orders' },
];

export const DashboardLayout = ({ variant = 'dashboard' }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isBuyer = variant === 'buyer';

  return (
    <div className="flex min-h-screen flex-col bg-tertiary">
      <Navbar onMenuClick={() => setSidebarOpen(true)} variant={variant} />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          navItems={isBuyer ? buyerItems : dashboardItems}
          logoTo={isBuyer ? '/buyer/search' : '/dashboard'}
          footerText={isBuyer ? 'ASRI Buyer v1.0.0' : 'ASRI v1.0.0'}
          showLogo={!isBuyer}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
