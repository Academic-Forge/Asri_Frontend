import { useState, useEffect } from 'react';
import { Package, Clock, Store } from 'lucide-react';
import { svc } from '../../../services/buyer';
import type { Order } from '../../../types/buyer/order';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';

const tabs = [
  { key: 'semua', label: 'Semua' },
  { key: 'belum-dibayar', label: 'Belum Dibayar' },
  { key: 'dikemas', label: 'Dikemas' },
  { key: 'dikirim', label: 'Dikirim' },
  { key: 'selesai', label: 'Selesai' },
  { key: 'dibatalkan', label: 'Dibatalkan' },
  { key: 'penilaian', label: 'Beri Penilaian' },
];

const statusMeta: Record<string, { color: string; icon: typeof Package; action?: string }> = {
  'belum-dibayar': { color: 'bg-amber-50 text-amber-600', icon: Clock, action: 'Bayar Sekarang' },
  'dikemas': { color: 'bg-blue-50 text-blue-600', icon: Package },
  'dikirim': { color: 'bg-secondary/10 text-secondary', icon: Package, action: 'Lacak' },
  'selesai': { color: 'bg-secondary/10 text-secondary', icon: Package, action: 'Beli Lagi' },
  'dibatalkan': { color: 'bg-red-50 text-red-500', icon: Package },
  'penilaian': { color: 'bg-purple-50 text-purple-600', icon: Clock, action: 'Beri Penilaian' },
};

const statusLabel: Record<string, string> = {
  'belum-dibayar': 'Belum Dibayar',
  'dikemas': 'Dikemas',
  'dikirim': 'Dikirim',
  'selesai': 'Selesai',
  'dibatalkan': 'Dibatalkan',
  'penilaian': 'Beri Penilaian',
};

export const PesananSaya = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    svc.getOrders(activeTab).then(setOrders);
  }, [activeTab]);

  return (
    <section className="mx-auto w-full animate-fade-in">
      <Breadcrumbs items={[{ label: 'Pesanan Saya' }]} />
      <h1 className="text-xl sm:text-2xl font-bold text-neutral">Pesanan Saya</h1>
      <p className="mt-1 text-sm text-neutral/50">Daftar pesanan yang masih aktif.</p>

      <div className="mt-4 sm:mt-6 -mx-4 sm:mx-0 overflow-x-auto">
        <div className="flex gap-1 px-4 sm:px-0 min-w-max border-b border-primary/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-neutral/50 hover:text-neutral'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 space-y-3">
        {orders.length === 0 && (
          <div className="text-center py-16">
            <Package className="mx-auto h-12 w-12 text-neutral/20" />
            <p className="mt-3 text-sm text-neutral/50">Tidak ada pesanan</p>
          </div>
        )}

        {orders.map((order) => {
          const meta = statusMeta[order.status];
          const Icon = meta?.icon || Package;

          return (
            <div
              key={order.id}
              className="rounded-xl border border-primary/10 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between border-b border-primary/5 px-4 py-2.5">
                <div className="flex items-center gap-1.5 text-xs text-neutral/50">
                  <Store className="h-3.5 w-3.5" />
                  {order.storeName}
                </div>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-semibold ${meta?.color || ''}`}
                >
                  {statusLabel[order.status] || order.status}
                </span>
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2.5 ${meta?.color || 'bg-primary/5 text-primary'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral">{order.productName}</p>
                    <p className="text-xs text-neutral/50">
                      {order.id} &middot; {order.date} &middot; {order.items} barang
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-primary">
                    Rp{order.total.toLocaleString('id-ID')}
                  </p>
                  {meta?.action && (
                    <button
                      className={`mt-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all active:scale-95 ${
                        order.status === 'dibatalkan'
                          ? 'text-red-500 hover:bg-red-50'
                          : 'bg-secondary text-white hover:bg-primary'
                      }`}
                    >
                      {meta.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PesananSaya;
