import { useState } from 'react';
import { Plus, X, Search, Edit2, Trash2, Box, Scale } from 'lucide-react';
import toast from 'react-hot-toast';
import { FormInput } from '../../../components/ui/FormInput';
import { TextAreaInput } from '../../../components/ui/TextAreaInput';
import { FileUpload } from '../../../components/ui/FileUpload';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  weight: number;
  image: string;
  description: string;
}

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Beras Pandan Wangi Premium',
    category: 'Beras & Biji-bijian',
    price: 75000,
    stock: 45,
    weight: 5000,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
    description: 'Beras asli Cianjur dengan wangi pandan alami tanpa pengawet.',
  },
  {
    id: 'prod-2',
    name: 'Madu Hutan Liar Murni',
    category: 'Olahan Lokal',
    price: 120000,
    stock: 12,
    weight: 350,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80',
    description: 'Madu murni yang diambil langsung dari hutan liar Sumatera.',
  },
  {
    id: 'prod-3',
    name: 'Kopi Arabika Gayo Single Origin',
    category: 'Olahan Lokal',
    price: 65000,
    stock: 8,
    weight: 250,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80',
    description: 'Biji kopi arabika Gayo dengan roast profile medium-to-dark.',
  },
];

export const ManageProducts = () => {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'semua' | 'aktif' | 'habis'>('semua');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Form Fields State
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('Sayuran');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productFile, setProductFile] = useState<File | null>(null);

  const resetForm = () => {
    setProductName('');
    setProductCategory('Sayuran');
    setProductPrice('');
    setProductStock('');
    setProductWeight('');
    setProductDesc('');
    setProductFile(null);
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductCategory(product.category);
    setProductPrice(product.price.toString());
    setProductStock(product.stock.toString());
    setProductWeight(product.weight.toString());
    setProductDesc(product.description);
    setProductFile(null);
    setIsModalOpen(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !productPrice || !productStock || !productWeight) {
      toast.error('Mohon isi semua data yang wajib!');
      return;
    }

    const priceNum = parseFloat(productPrice);
    const stockNum = parseInt(productStock);
    const weightNum = parseFloat(productWeight);

    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error('Harga harus lebih dari 0!');
      return;
    }

    if (editingProduct) {
      // Edit Product
      setProducts(
        products.map((p) => {
          if (p.id === editingProduct.id) {
            return {
              ...p,
              name: productName,
              category: productCategory,
              price: priceNum,
              stock: stockNum,
              weight: weightNum,
              image: productFile ? URL.createObjectURL(productFile) : p.image,
              description: productDesc,
            };
          }
          return p;
        })
      );
      toast.success('Produk berhasil diperbarui!');
    } else {
      // Add Product
      const newProduct: ProductItem = {
        id: `prod-${Date.now()}`,
        name: productName,
        category: productCategory,
        price: priceNum,
        stock: stockNum,
        weight: weightNum,
        image: productFile
          ? URL.createObjectURL(productFile)
          : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
        description: productDesc,
      };

      setProducts([newProduct, ...products]);
      toast.success('Produk baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success('Produk berhasil dihapus');
    }
  };

  // Filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'semua') return matchesSearch;
    if (activeTab === 'aktif') return matchesSearch && product.stock > 0;
    if (activeTab === 'habis') return matchesSearch && product.stock === 0;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 w-full">
      
      {/* Top Header Row */}
      <div>
        <Breadcrumbs items={[{ label: 'Kelola Produk' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Katalog Produk</h1>
            <p className="text-slate-500 text-sm">Kelola produk yang Anda jual di platform ASRI.</p>
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
                Daftar Produk ({filteredProducts.length})
              </h2>
            </div>
            
            {/* Category/Status Tabs */}
            <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl self-start">
              {[
                { id: 'semua', label: 'Semua' },
                { id: 'aktif', label: 'Aktif' },
                { id: 'habis', label: 'Habis' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'semua' | 'aktif' | 'habis')}
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

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80 sm:ml-auto">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Cari data produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold"
              />
            </div>
            
            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl font-bold text-sm sm:text-base shadow-md shadow-primary/10 transition-all duration-200 cursor-pointer active:scale-[0.98] shrink-0"
            >
              <Plus size={18} />
              Tambah Produk
            </button>
          </div>
        </div>

        {/* Table Body */}
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-5 px-6 text-center w-20">No</th>
                  <th className="py-5 px-6">Info Produk</th>
                  <th className="py-5 px-6">Kategori</th>
                  <th className="py-5 px-6">Harga</th>
                  <th className="py-5 px-6 text-center">Stok</th>
                  <th className="py-5 px-6">Berat</th>
                  <th className="py-5 px-6 text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {filteredProducts.map((product, index) => {
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 text-center text-slate-500 text-sm font-bold">{index + 1}</td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-2xl border border-slate-100 shadow-sm shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-slate-800 text-sm sm:text-base line-clamp-1">{product.name}</h4>
                            <p className="text-xs sm:text-sm text-slate-400 line-clamp-1 font-normal mt-1">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="text-xs sm:text-sm px-3.5 py-1.5 bg-slate-100 text-slate-600 rounded-xl font-bold border border-slate-200">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-slate-900 font-extrabold text-sm sm:text-base">
                        Rp {product.price.toLocaleString('id-ID')}
                      </td>
                      <td className="py-5 px-6 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-extrabold border uppercase tracking-wider ${
                            product.stock === 0
                              ? 'bg-rose-50 border-rose-200 text-rose-600'
                              : product.stock <= 10
                              ? 'bg-amber-50 border-amber-200 text-amber-600'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                          }`}
                        >
                          {product.stock === 0 ? 'Habis' : `${product.stock} Unit`}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-xs sm:text-sm text-slate-600 font-extrabold">
                        <span className="flex items-center gap-1.5">
                          <Scale size={14} className="text-slate-400" />
                          {(product.weight / 1000).toFixed(1)} kg
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-3.5 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded-2xl transition-all duration-200 hover:text-slate-700 cursor-pointer shadow-sm"
                            title="Edit Produk"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-3.5 border border-rose-100 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all duration-200 hover:text-rose-700 cursor-pointer shadow-sm"
                            title="Hapus Produk"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
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
                <Box size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-700">Belum Ada Produk</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Anda belum memiliki produk terdaftar di kategori ini.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ADD/EDIT PRODUCT CENTERED MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white rounded-t-3xl">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {editingProduct ? 'Edit Informasi Produk' : 'Tambah Produk Baru'}
                </h2>
                <p className="text-xs text-slate-500">
                  {editingProduct ? 'Perbarui informasi komoditas jualan Anda.' : 'Lengkapi formulir untuk menambahkan komoditas ke pasar.'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Body (Scrollable) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5">
              <form id="product-form" onSubmit={handleProductSubmit} className="space-y-5">
                
                <FormInput
                  label="Nama Produk *"
                  id="product-name"
                  placeholder="Contoh: Sayur Bayam Organik Segar"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />

                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="product-category" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Kategori *
                  </label>
                  <select
                    id="product-category"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all cursor-pointer font-bold text-slate-800"
                  >
                    <option value="Sayuran">Sayuran Segar</option>
                    <option value="Buah-buahan">Buah-buahan</option>
                    <option value="Beras & Biji-bijian">Beras & Biji-bijian</option>
                    <option value="Olahan Lokal">Olahan Lokal</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormInput
                    label="Harga (Rp) *"
                    id="product-price"
                    type="number"
                    placeholder="15000"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />

                  <FormInput
                    label="Stok Awal *"
                    id="product-stock"
                    type="number"
                    placeholder="25"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                  />

                  <FormInput
                    label="Berat (Gram) *"
                    id="product-weight"
                    type="number"
                    placeholder="500"
                    icon={<Scale size={14} className="text-slate-400" />}
                    value={productWeight}
                    onChange={(e) => setProductWeight(e.target.value)}
                  />
                </div>

                <TextAreaInput
                  label="Deskripsi Produk"
                  id="product-desc"
                  placeholder="Tuliskan spesifikasi lengkap, keunggulan, atau petunjuk penyimpanan produk..."
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                />

                <FileUpload
                  label="Foto Produk"
                  id="product-photo"
                  accept="image/*"
                  onChange={(file) => setProductFile(file)}
                  value={productFile}
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
                form="product-form"
                className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-colors cursor-pointer text-center"
              >
                {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ManageProducts;
