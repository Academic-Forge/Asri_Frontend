import { X } from 'lucide-react';

interface ProductFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = ['Semua', 'Elektronik', 'Fashion', 'Makanan', 'Kesehatan', 'Alat Tulis'];

export const ProductFilter = ({ isOpen, onClose }: ProductFilterProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-primary/10 bg-white p-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-primary/10 pb-3">
          <h2 className="text-sm font-semibold text-neutral">Filter</h2>
          <button onClick={onClose} className="lg:hidden p-1 text-neutral/50 hover:text-neutral">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral/60">
              Kategori
            </h3>
            <div className="mt-2 space-y-1">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-neutral transition-colors hover:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="category"
                    defaultChecked={cat === 'Semua'}
                    className="h-3.5 w-3.5 accent-secondary"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-primary/10 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral/60">
              Rentang Harga
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full rounded-lg border border-primary/10 px-3 py-1.5 text-xs text-neutral placeholder:text-neutral/30 focus:border-secondary focus:outline-none"
              />
              <span className="text-neutral/30">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full rounded-lg border border-primary/10 px-3 py-1.5 text-xs text-neutral placeholder:text-neutral/30 focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <button className="w-full rounded-lg bg-secondary py-2 text-sm font-semibold text-white transition-all hover:bg-primary active:scale-[0.98]">
            Terapkan Filter
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProductFilter;
