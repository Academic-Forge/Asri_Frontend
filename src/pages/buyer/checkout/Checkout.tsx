import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CartSummary } from '../../../components/buyer/CartSummary';
import { useCartStore } from '../../../store/cartStore';

export const Checkout = () => {
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <section className="mx-auto w-full animate-fade-in">
      <Link
        to="/buyer/search"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Lanjut Belanja
      </Link>

      <h1 className="text-xl sm:text-2xl font-bold text-neutral">Checkout</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <CartSummary />
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
                <span className="text-primary">
                  Rp{useCartStore.getState().totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <Link
              to="/buyer/checkout/shipping"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-semibold text-white shadow-sm shadow-secondary/30 transition-all hover:bg-primary active:scale-[0.98]"
            >
              Pilih Pengiriman
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
