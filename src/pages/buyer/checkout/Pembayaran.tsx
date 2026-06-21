import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building, Wallet, Banknote, ChevronRight } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';
import { svc } from '../../../services/buyer';
import type { PaymentOption } from '../../../types/buyer';

const paymentIcons: Record<string, typeof Building> = {
  bank_transfer: Building,
  e_wallet: Wallet,
  cod: Banknote,
};

const typeLabels: Record<string, string> = {
  bank_transfer: 'Transfer Bank',
  e_wallet: 'E-Wallet',
  cod: 'COD',
};

export const Pembayaran = () => {
  const totalPrice = useCartStore((s) => s.totalPrice);
  const selectedShippingId = useCartStore((s) => s.selectedShippingId);
  const selectedPaymentId = useCartStore((s) => s.selectedPaymentId);
  const setPayment = useCartStore((s) => s.setPayment);
  const [payments, setPayments] = useState<PaymentOption[]>([]);
  const [shippingInfo, setShippingInfo] = useState({ name: '-', cost: 0 });

  useEffect(() => {
    svc.getPaymentOptions().then(setPayments);
    if (selectedShippingId) {
      svc.getShippingCost(selectedShippingId).then(setShippingInfo);
    }
  }, [selectedShippingId]);

  const grandTotal = totalPrice + shippingInfo.cost;

  const paymentGroups = payments.reduce<Record<string, PaymentOption[]>>((acc, p) => {
    if (!acc[p.type]) acc[p.type] = [];
    acc[p.type].push(p);
    return acc;
  }, {});

  return (
    <section className="mx-auto max-w-4xl animate-fade-in">
      <Link
        to="/buyer/checkout/shipping"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Pengiriman
      </Link>

      <h1 className="text-xl sm:text-2xl font-bold text-neutral">Pilih Pembayaran</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-neutral">Metode Pembayaran</h2>
          {Object.entries(paymentGroups).map(([type, options]) => (
            <div key={type}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral/50">
                {typeLabels[type] || type}
              </h3>
              <div className="space-y-2">
                {options.map((payment) => {
                  const Icon = paymentIcons[payment.type];
                  const isSelected = selectedPaymentId === payment.id;
                  return (
                    <button
                      key={payment.id}
                      onClick={() => setPayment(payment.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        isSelected
                          ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                          : 'border-primary/10 bg-white hover:border-primary/20 hover:shadow-sm'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center rounded-lg p-2 ${
                          isSelected ? 'bg-secondary text-white' : 'bg-primary/5 text-primary'
                        }`}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${isSelected ? 'text-secondary' : 'text-neutral'}`}>
                          {payment.name}
                        </p>
                        <p className="text-xs text-neutral/50">{payment.description}</p>
                      </div>
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${
                          isSelected
                            ? 'border-secondary bg-secondary'
                            : 'border-neutral/30'
                        }`}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
                  {shippingInfo.name}
                </span>
              </div>
              <div className="flex justify-between text-neutral/60">
                <span>Biaya Ongkir</span>
                <span className="text-neutral">
                  Rp{shippingInfo.cost.toLocaleString('id-ID')}
                </span>
              </div>
              {selectedPaymentId && (
                <div className="flex justify-between text-neutral/60">
                  <span>Pembayaran</span>
                  <span className="text-neutral">
                    {payments.find((p) => p.id === selectedPaymentId)?.name}
                  </span>
                </div>
              )}
              <div className="border-t border-primary/10 pt-2 flex justify-between font-semibold">
                <span className="text-neutral">Total</span>
                <span className="text-lg font-bold text-primary">
                  Rp{grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              disabled={!selectedPaymentId}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-semibold text-white shadow-sm shadow-secondary/30 transition-all hover:bg-primary active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              Buat Pesanan
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pembayaran;
