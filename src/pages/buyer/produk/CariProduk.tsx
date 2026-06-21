import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../../../components/buyer/ProductCard';
import { ProductFilter } from '../../../components/buyer/ProductFilter';
import { svc } from '../../../services/buyer';
import type { Product } from '../../../types/buyer';

export const CariProduk = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    svc.searchProducts({ q: query }).then(setProducts);
  }, [query]);

  const filtered = products;

  return (
    <section className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral">Cari Produk</h1>
          <p className="mt-1 text-sm text-neutral/50">
            {filtered.length} produk ditemukan
          </p>
        </div>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-primary/10 bg-white px-3 py-2 text-sm font-medium text-neutral transition-colors hover:bg-primary/5 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="mt-4 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari produk atau toko..."
          className="w-full rounded-xl border border-primary/10 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral placeholder:text-neutral/40 shadow-sm focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
        />
      </div>

      <div className="mt-4 sm:mt-6 flex gap-6">
        <ProductFilter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />

        {filtered.length === 0 ? (
          <div className="flex-1 text-center py-16">
            <Search className="mx-auto h-12 w-12 text-neutral/20" />
            <p className="mt-3 text-sm text-neutral/50">Produk tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {filtered.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CariProduk;
