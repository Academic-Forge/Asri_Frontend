import { useState, useEffect } from 'react';
import { Clock, Package, Store } from 'lucide-react';
import { svc } from '../../../services/buyer';
import type { Order } from '../../../types/buyer/order';

const statusColor: Record<string, string> = {
  Selesai: 'bg-secondary/10 text-secondary',
  Dikirim: 'bg-blue-50 text-blue-600',
};

export const RiwayatPesanan = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    svc.getOrderHistory().then(setOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <section className="mx-auto w-full animate-fade-in text-center py-16 sm:py-24">
        <Clock className="mx-auto h-16 w-16 text-neutral/20" />
        <h2 className="mt-4 text-lg font-semibold text-neutral">Belum Ada Riwayat</h2>
        <p className="mt-1 text-sm text-neutral/50">Pesanan yang selesai akan muncul di sini.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full animate-fade-in">
      <h1 className="text-xl sm:text-2xl font-bold text-neutral">Riwayat Pesanan</h1>
      <p className="mt-1 text-sm text-neutral/50">Daftar pesanan yang sudah selesai atau dikirim.</p>

      <div className="mt-6 space-y-3">
        {orders.map((order) => (
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
                className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                  statusColor[order.status] || 'bg-neutral/10 text-neutral/60'
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/5 p-2.5 text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral">{order.productName}</p>
                  <p className="text-xs text-neutral/50">
                    {order.id} &middot; {order.date} &middot; {order.items} barang
                  </p>
                </div>
              </div>

              <p className="text-sm font-bold text-primary">
                Rp{order.total.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RiwayatPesanan;
