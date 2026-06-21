import { Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const CartSummary = () => {
  const { items, totalPrice, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-primary/10 bg-white p-6 text-center">
        <p className="text-sm text-neutral/50">Keranjang belanja kosong.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
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

      <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral/60">Total ({items.length} barang)</span>
          <span className="text-lg font-bold text-primary">
            Rp{totalPrice.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
