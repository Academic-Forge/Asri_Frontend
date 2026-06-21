import { useState } from 'react';
import { Truck, Search, Calendar, User, ShoppingBag, ArrowRight, Clipboard, Eye, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  buyerName: string;
  buyerAddress: string;
  date: string;
  items: OrderItem[];
  shippingType: 'Hemat' | 'Cepat';
  shippingCost: number;
  totalAmount: number;
  status: 'perlu_dikirim' | 'dikirim' | 'selesai' | 'batal';
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ASRI-ORD-9021',
    buyerName: 'Warung Kelontong Ibu Rina',
    buyerAddress: 'Jalan Kebon Jeruk No. 15, Jakarta Barat',
    date: '2026-06-20 14:30',
    items: [
      { id: 'prod-1', name: 'Beras Pandan Wangi Premium (5kg)', qty: 2, price: 75000, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=150&q=80' },
      { id: 'prod-4', name: 'Bayam Organik Segar (500g)', qty: 5, price: 12000, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=150&q=80' }
    ],
    shippingType: 'Cepat',
    shippingCost: 35000,
    totalAmount: 245000,
    status: 'perlu_dikirim',
  },
  {
    id: 'ASRI-ORD-8812',
    buyerName: 'Restoran Rasa Nusantara',
    buyerAddress: 'Jalan Pajajaran No. 42, Bogor Tengah',
    date: '2026-06-20 09:15',
    items: [
      { id: 'prod-2', name: 'Madu Hutan Liar Murni (350g)', qty: 3, price: 120000, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=150&q=80' }
    ],
    shippingType: 'Hemat',
    shippingCost: 15000,
    totalAmount: 375000,
    status: 'perlu_dikirim',
  },
  {
    id: 'ASRI-ORD-7751',
    buyerName: 'Koperasi Karyawan Sejahtera',
    buyerAddress: 'Jalan Sudirman Kav 21, Jakarta Selatan',
    date: '2026-06-18 11:20',
    items: [
      { id: 'prod-3', name: 'Kopi Arabika Gayo Single Origin (250g)', qty: 10, price: 65000, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=150&q=80' }
    ],
    shippingType: 'Hemat',
    shippingCost: 20000,
    totalAmount: 670000,
    status: 'dikirim',
  },
  {
    id: 'ASRI-ORD-6124',
    buyerName: 'Catering Sehat Ibu Ani',
    buyerAddress: 'Jalan Margonda Raya No. 120, Depok',
    date: '2026-06-15 16:45',
    items: [
      { id: 'prod-4', name: 'Bayam Organik Segar (500g)', qty: 8, price: 12000, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=150&q=80' }
    ],
    shippingType: 'Cepat',
    shippingCost: 25000,
    totalAmount: 121000,
    status: 'selesai',
  }
];

export const ViewOrders = () => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<'semua' | 'perlu_dikirim' | 'dikirim' | 'selesai'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Handle ship action (mock transition)
  const handleConfirmShip = (orderId: string) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        toast.success('Pengiriman pesanan dikonfirmasi!');
        toast('Driver ASRI in-house logistik sedang menjemput...', { icon: '🛵' });
        const updated = { ...order, status: 'dikirim' as const };
        setSelectedOrder(updated); // Sync modal details view
        return updated;
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('ID Pesanan disalin!', { icon: '📋' });
  };

  const openDetailsModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.buyerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'semua') return matchesSearch;
    return matchesSearch && order.status === activeTab;
  });

  return (
    <div className="space-y-6 w-full">
      
      {/* Header Row */}
      <div>
        <Breadcrumbs items={[{ label: 'Lihat Pesanan' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Daftar Pesanan</h1>
            <p className="text-slate-500 text-sm">Kelola dan pantau pengiriman produk pesanan pembeli.</p>
          </div>
        </div>
      </div>

      {/* Main Table Card (Reference Style) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Table Header Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-start w-full lg:w-auto gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h2 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-wider">
                Data Pesanan
              </h2>
            </div>
            
            {/* Filter Navigation Tabs */}
            <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl self-start">
              {[
                { id: 'semua', label: 'Semua' },
                { id: 'perlu_dikirim', label: 'Perlu Kirim' },
                { id: 'dikirim', label: 'Dikirim' },
                { id: 'selesai', label: 'Selesai' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'semua' | 'perlu_dikirim' | 'dikirim' | 'selesai')}
                  className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80 sm:ml-auto">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Cari ID Pesanan atau pembeli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold"
            />
          </div>
        </div>

        {/* Table Body */}
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-5 px-6 text-center w-20">No</th>
                  <th className="py-5 px-6">ID Pesanan</th>
                  <th className="py-5 px-6">Tanggal Transaksi</th>
                  <th className="py-5 px-6">Nama Pembeli</th>
                  <th className="py-5 px-6">Total Pembayaran</th>
                  <th className="py-5 px-6 text-center">Status</th>
                  <th className="py-5 px-6 text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {filteredOrders.map((order, index) => {
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 text-center text-slate-500 text-sm font-bold">{index + 1}</td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-slate-800 text-sm sm:text-base">{order.id}</span>
                          <button
                            onClick={() => copyToClipboard(order.id)}
                            className="p-1 hover:bg-slate-200/50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                          >
                            <Clipboard size={13} />
                          </button>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-xs sm:text-sm text-slate-600 font-normal flex items-center gap-1.5">
                          <Calendar size={14} className="text-slate-400" />
                          {order.date}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-600 border border-slate-200 shrink-0 shadow-sm">
                            {order.buyerName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-800 text-sm sm:text-base block">{order.buyerName}</span>
                            <span className="text-xs sm:text-sm text-slate-400 font-normal line-clamp-1 block mt-1">{order.buyerAddress}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-900 font-extrabold text-sm sm:text-base">
                        Rp {order.totalAmount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-5 px-6 text-center">
                        <span
                          className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold border uppercase tracking-wider ${
                            order.status === 'perlu_dikirim'
                              ? 'bg-amber-50 border-amber-200 text-amber-600 animate-pulse'
                              : order.status === 'dikirim'
                              ? 'bg-sky-50 border-sky-200 text-sky-600'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                          }`}
                        >
                          {order.status === 'perlu_dikirim'
                            ? 'Perlu Kirim'
                            : order.status === 'dikirim'
                            ? 'Dikirim'
                            : 'Selesai'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => openDetailsModal(order)}
                          className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-all duration-200 cursor-pointer shadow-sm inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider"
                          title="Lihat Detail Pesanan"
                        >
                          <Eye size={14} />
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-700">Belum Ada Pesanan</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tidak ada pesanan masuk untuk status kriteria filter ini.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* DETAILED ORDER DETAILS CENTERED MODAL */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between rounded-t-3xl bg-white">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900">Rincian Transaksi</h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold border uppercase ${
                      selectedOrder.status === 'perlu_dikirim'
                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                        : selectedOrder.status === 'dikirim'
                        ? 'bg-sky-50 border-sky-200 text-sky-600'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                    }`}
                  >
                    {selectedOrder.status === 'perlu_dikirim' ? 'Perlu Dikirim' : selectedOrder.status === 'dikirim' ? 'Dikirim' : 'Selesai'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-bold mt-0.5">ID Transaksi: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable Details) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5">
              
              {/* Buyer profile */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Penerima & Alamat Kirim</h4>
                <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="p-2.5 bg-white text-slate-400 border border-slate-200 rounded-xl">
                    <User size={16} />
                  </div>
                  <div className="text-xs">
                    <h5 className="font-extrabold text-slate-800">{selectedOrder.buyerName}</h5>
                    <p className="text-slate-500 mt-1 leading-relaxed">{selectedOrder.buyerAddress}</p>
                  </div>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Komoditas yang Dipesan</h4>
                <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="p-4 flex gap-4 items-center bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-100 shadow-sm shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">{item.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-bold">
                          {item.qty} Pcs x Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800 text-right shrink-0">
                        Rp {(item.qty * item.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logistics & Cost Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Courier info */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Layanan Pengiriman</h4>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="p-2 bg-white text-slate-500 rounded-xl border border-slate-200">
                      <Truck size={16} />
                    </div>
                    <div className="text-xs">
                      <span className="font-extrabold text-slate-800 block">ASRI {selectedOrder.shippingType === 'Cepat' ? 'Express (Same-Day)' : 'Hemat (Next-Day)'}</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">Ongkir: Rp {selectedOrder.shippingCost.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ringkasan Biaya</h4>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between font-medium text-slate-500">
                      <span>Total Barang</span>
                      <span>Rp {(selectedOrder.totalAmount - selectedOrder.shippingCost).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between font-medium text-slate-500">
                      <span>Ongkos Kirim</span>
                      <span>Rp {selectedOrder.shippingCost.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between font-extrabold text-slate-800 pt-2 border-t border-slate-200">
                      <span>Total Bayar</span>
                      <span className="text-primary text-sm">Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-3xl">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>

              {selectedOrder.status === 'perlu_dikirim' && (
                <>
                  <button
                    type="button"
                    onClick={() => toast('Menghubungi pembeli via WhatsApp...', { icon: '💬' })}
                    className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Hubungi Pembeli
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmShip(selectedOrder.id)}
                    className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-primary/10 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    Konfirmasi Pengiriman
                    <ArrowRight size={12} />
                  </button>
                </>
              )}

              {selectedOrder.status === 'dikirim' && (
                <button
                  type="button"
                  onClick={() => toast('Membuka Peta Pelacakan Live Driver ASRI...', { icon: '🗺️' })}
                  className="px-4 py-2 bg-white border border-slate-200 text-sky-600 hover:bg-sky-50 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Lacak Driver
                </button>
              )}

              {selectedOrder.status === 'selesai' && (
                <button
                  type="button"
                  onClick={() => toast('Mempersiapkan Rincian Invoice...', { icon: '📄' })}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Unduh Invoice
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ViewOrders;
