import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../../types/buyer';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group animate-slide-up rounded-xl border border-primary/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <Link to={`/buyer/product/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden rounded-t-xl bg-tertiary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <p className="text-xs text-neutral/50 truncate">{product.storeName}</p>

        <Link to={`/buyer/product/${product.slug}`}>
          <h3 className="mt-1 text-sm sm:text-base font-semibold text-neutral line-clamp-2 hover:text-secondary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2 text-xs text-neutral/50">
          <span className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
          <span>| Terjual {product.sold}</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm sm:text-base font-bold text-primary">
            Rp{product.price.toLocaleString('id-ID')}
          </p>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1 rounded-lg bg-secondary p-2 text-white transition-all hover:bg-primary active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
