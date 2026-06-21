import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';

export const Cart = () => {
  const { items, totalPrice, totalItems, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-4xl animate-fade-in text-center py-16 sm:py-24">
        <ShoppingBag className="mx-auto h-16 w-16 text-neutral/20" />
        <h2 className="mt-4 text-lg font-semibold text-neutral">Keranjang Kosong</h2>
        <p className="mt-1 text-sm text-neutral/50">Belum ada produk di keranjang.</p>
        <Link
          to="/buyer/search"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary"
        >
          Mulai Belanja
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl animate-fade-in">
      <Link
        to="/buyer/search"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Lanjut Belanja
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral">Keranjang</h1>
        <span className="text-sm text-neutral/50">{totalItems} barang</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white p-3 sm:p-4 shadow-sm transition-all hover:shadow-md"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
              />

              <div className="min-w-0 flex-1">
                <p className="text-xs text-neutral/50">{item.product.storeName}</p>
                <h4 className="truncate text-sm font-semibold text-neutral">
                  {item.product.name}
                </h4>
                <p className="mt-1 text-sm font-bold text-primary">
                  Rp{item.product.price.toLocaleString('id-ID')}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="flex items-center justify-center rounded border border-primary/20 p-1 text-neutral/60 transition-colors hover:bg-primary/5"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-neutral">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="flex items-center justify-center rounded border border-primary/20 p-1 text-neutral/60 transition-colors hover:bg-primary/5"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="ml-auto rounded-lg p-1.5 text-neutral/40 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral">Ringkasan Belanja</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-neutral/60">
                <span>Total Barang</span>
                <span className="text-neutral">{totalItems} item</span>
              </div>
              <div className="border-t border-primary/10 pt-2 flex justify-between font-semibold">
                <span className="text-neutral">Subtotal</span>
                <span className="text-lg font-bold text-primary">
                  Rp{totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <Link
              to="/buyer/checkout"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-semibold text-white shadow-sm shadow-secondary/30 transition-all hover:bg-primary active:scale-[0.98]"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
