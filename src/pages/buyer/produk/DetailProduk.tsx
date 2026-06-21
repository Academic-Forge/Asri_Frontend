import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Store } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';
import { svc } from '../../../services/buyer';
import type { Product } from '../../../types/buyer';

export const DetailProduk = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (slug) {
      svc.getProduct(slug).then(setProduct);
    }
  }, [slug]);

  if (!product) {
    return (
      <section className="mx-auto max-w-5xl animate-fade-in text-center py-16">
        <p className="text-neutral/50">Memuat produk...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl animate-fade-in">
      <Link
        to="/buyer/search"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        <div className="aspect-square overflow-hidden rounded-2xl bg-tertiary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-neutral/50">
            <Store className="h-3.5 w-3.5" />
            {product.storeName}
          </div>

          <h1 className="mt-2 text-xl sm:text-2xl font-bold text-neutral">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-400" />
              {product.rating}
            </span>
            <span className="text-neutral/40">|</span>
            <span className="text-neutral/50">Terjual {product.sold}</span>
            <span className="text-neutral/40">|</span>
            <span className="text-neutral/50">Stok {product.stock}</span>
          </div>

          <p className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
            Rp{product.price.toLocaleString('id-ID')}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-neutral/60">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-medium text-neutral">Jumlah:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex items-center justify-center rounded-lg border border-primary/20 p-2 text-neutral transition-colors hover:bg-primary/5 active:scale-95"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-neutral">{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="flex items-center justify-center rounded-lg border border-primary/20 p-2 text-neutral transition-colors hover:bg-primary/5 active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addItem(product, qty)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-secondary bg-white py-2.5 text-sm font-semibold text-secondary transition-all hover:bg-secondary/5 active:scale-[0.98]"
            >
              <ShoppingCart className="h-4 w-4" />
              Keranjang
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-semibold text-white shadow-sm shadow-secondary/30 transition-all hover:bg-primary active:scale-[0.98]">
              Beli Langsung
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduk;
