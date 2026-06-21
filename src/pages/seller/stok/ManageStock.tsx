import { useState } from 'react';
import { Search, AlertTriangle, Edit2, X, Scale } from 'lucide-react';
import toast from 'react-hot-toast';
import { FormInput } from '../../../components/ui/FormInput';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';

interface StockItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  initialStock: number;
  image: string;
  weight: number;
}

const INITIAL_STOCK: StockItem[] = [
  { id: 'prod-1', name: 'Beras Pandan Wangi Premium', category: 'Beras & Biji-bijian', price: 75000, stock: 45, initialStock: 45, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=150&q=80', weight: 5000 },
  { id: 'prod-2', name: 'Madu Hutan Liar Murni', category: 'Olahan Lokal', price: 120000, stock: 12, initialStock: 12, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=150&q=80', weight: 350 },
  { id: 'prod-3', name: 'Kopi Arabika Gayo Single Origin', category: 'Olahan Lokal', price: 65000, stock: 8, initialStock: 8, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=150&q=80', weight: 250 },
  { id: 'prod-4', name: 'Bayam Organik Segar', category: 'Sayuran', price: 12000, stock: 3, initialStock: 3, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=150&q=80', weight: 500 },
  { id: 'prod-5', name: 'Cabai Rawit Merah Unggul', category: 'Sayuran', price: 48000, stock: 0, initialStock: 0, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80', weight: 200 },
];

export const ManageStock = () => {
  const [stockList, setStockList] = useState<StockItem[]>(INITIAL_STOCK);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);

  // Modal Input States
  const [inputStock, setInputStock] = useState('');
  const [inputPrice, setInputPrice] = useState('');

  const openEditModal = (item: StockItem) => {
    setEditingItem(item);
    setInputStock(item.stock.toString());
    setInputPrice(item.price.toString());
    setIsModalOpen(true);
  };

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem) return;

    const stockNum = parseInt(inputStock);
    const priceNum = parseFloat(inputPrice);

    if (isNaN(stockNum) || stockNum < 0) {
      toast.error('Jumlah stok tidak valid!');
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error('Harga produk tidak valid!');
      return;
    }

    setStockList(
      stockList.map((item) => {
        if (item.id === editingItem.id) {
          toast.success(`Stok ${item.name} berhasil diperbarui!`);
          return { ...item, stock: stockNum, price: priceNum };
        }
        return item;
      })
    );

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const filteredStock = stockList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full">
      
      {/* Header Row */}
      <div>
        <Breadcrumbs items={[{ label: 'Kelola Stok' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Kelola Stok</h1>
            <p className="text-slate-500 text-sm">Pantau dan perbarui kapasitas ketersediaan produk pertanian Anda.</p>
          </div>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {stockList.some((item) => item.stock <= 5) && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-800 shadow-sm">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-sm font-bold">Pemberitahuan Stok Menipis</h4>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
              Beberapa produk Anda berada di bawah batas minimal (5 unit) atau habis. Segera lakukan penyesuaian stok untuk menghindari penolakan transaksi otomatis.
            </p>
          </div>
        </div>
      )}

      {/* Main Table Card (Reference Style) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Table Header Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-wider">
              Data Stok Produk
            </h2>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Cari produk atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold"
            />
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
                <th className="py-5 px-6 text-center w-20">No</th>
                <th className="py-5 px-6">Produk</th>
                <th className="py-5 px-6">Kategori</th>
                <th className="py-5 px-6">Harga Satuan</th>
                <th className="py-5 px-6 text-center">Status</th>
                <th className="py-5 px-6 text-center">Jumlah Stok</th>
                <th className="py-5 px-6 text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {filteredStock.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50/50 transition-colors ${
                    item.stock === 0 ? 'bg-rose-50/10' : item.stock <= 5 ? 'bg-amber-50/10' : ''
                  }`}
                >
                  <td className="py-5 px-6 text-center text-slate-500 text-sm font-bold">{index + 1}</td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-2xl border border-slate-100 shadow-sm shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base line-clamp-1">{item.name}</h4>
                        <span className="text-xs sm:text-sm text-slate-400 font-normal flex items-center gap-1.5 mt-1">
                          <Scale size={14} className="text-slate-400" />
                          {(item.weight / 1000).toFixed(1)} kg
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-xs sm:text-sm px-3.5 py-1.5 bg-slate-100 text-slate-600 rounded-xl font-bold border border-slate-200">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-slate-900 font-extrabold text-sm sm:text-base">
                    Rp {item.price.toLocaleString('id-ID')}
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span
                      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold border uppercase tracking-wider ${
                        item.stock === 0
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : item.stock <= 5
                          ? 'bg-amber-50 border-amber-200 text-amber-600'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      }`}
                    >
                      {item.stock === 0 ? 'Kosong' : item.stock <= 5 ? 'Menipis' : 'Aman'}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center text-slate-900 font-extrabold text-base sm:text-lg">
                    {item.stock} Unit
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-4.5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-xl transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider"
                        title="Edit Stok"
                      >
                        <Edit2 size={14} />
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT STOCK MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col z-10 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between rounded-t-3xl">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Perbarui Stok & Harga</h2>
                <p className="text-xs text-slate-500">Edit ketersediaan unit untuk komoditas pilihan Anda.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Form */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <img
                  src={editingItem.image}
                  alt={editingItem.name}
                  className="w-12 h-12 object-cover rounded-xl border border-slate-200 shadow-sm shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm truncate">{editingItem.name}</h4>
                  <span className="text-[10px] text-slate-400 font-normal">{editingItem.category}</span>
                </div>
              </div>

              <form id="stock-form" onSubmit={handleStockSubmit} className="space-y-4">
                <FormInput
                  label="Jumlah Stok Tersedia *"
                  id="stock-qty"
                  type="number"
                  placeholder="25"
                  value={inputStock}
                  onChange={(e) => setInputStock(e.target.value)}
                />

                <FormInput
                  label="Harga Satuan (Rp) *"
                  id="stock-price"
                  type="number"
                  placeholder="75000"
                  value={inputPrice}
                  onChange={(e) => setInputPrice(e.target.value)}
                />
              </form>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 rounded-b-3xl">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-xl text-sm font-bold transition-colors cursor-pointer text-center"
              >
                Batalkan
              </button>
              <button
                type="submit"
                form="stock-form"
                className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-colors cursor-pointer text-center"
              >
                Simpan Stok
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageStock;
