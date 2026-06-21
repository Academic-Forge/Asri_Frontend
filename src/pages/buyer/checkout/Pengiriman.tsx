import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react';
import { ShippingCard } from '../../../components/buyer/ShippingCard';
import { useCartStore } from '../../../store/cartStore';
import { svc } from '../../../services/buyer';
import type { Address, ShippingOption } from '../../../types/buyer';

export const Pengiriman = () => {
  const navigate = useNavigate();
  const selectedShippingId = useCartStore((s) => s.selectedShippingId);
  const setShipping = useCartStore((s) => s.setShipping);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const [address, setAddress] = useState<Address | null>(null);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);

  useEffect(() => {
    svc.getDefaultAddress().then(setAddress);
    svc.getShippingOptions().then(setShippingOptions);
  }, []);

  const shipping = shippingOptions.find((s) => s.id === selectedShippingId);
  const ongkir = shipping?.cost ?? 0;

  return (
    <section className="mx-auto w-full animate-fade-in">
      <Link
        to="/buyer/checkout"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Checkout
      </Link>

      <h1 className="text-xl sm:text-2xl font-bold text-neutral">Pilih Pengiriman</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {address && (
            <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                <h2 className="text-sm font-semibold text-neutral">Alamat Pengiriman</h2>
              </div>
              <div className="mt-3 pl-7">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold text-secondary">
                    {address.label}
                  </span>
                  <span className="text-sm font-medium text-neutral">{address.recipient}</span>
                  <span className="text-xs text-neutral/50">{address.phone}</span>
                </div>
                <p className="mt-1 text-xs text-neutral/50">{address.fullAddress}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-neutral">Metode Pengiriman</h2>
            {shippingOptions.map((option) => (
              <ShippingCard
                key={option.id}
                option={option}
                selected={selectedShippingId === option.id}
                onSelect={() => setShipping(option.id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral">Ringkasan Pembayaran</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-neutral/60">
                <span>Subtotal</span>
                <span className="text-neutral">
                  Rp{totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-neutral/60">
                <span>Ongkos Kirim</span>
                <span className="text-neutral">
                  {selectedShippingId
                    ? `Rp${ongkir.toLocaleString('id-ID')}`
                    : '-'}
                </span>
              </div>
              <div className="border-t border-primary/10 pt-2 flex justify-between font-semibold">
                <span className="text-neutral">Total</span>
                <span className="text-lg font-bold text-primary">
                  Rp{(totalPrice + ongkir).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/buyer/checkout/payment')}
              disabled={!selectedShippingId}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-semibold text-white shadow-sm shadow-secondary/30 transition-all hover:bg-primary active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              Lanjut ke Pembayaran
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pengiriman;
