import { Package, Clock } from 'lucide-react';
import type { ShippingOption } from '../../types/buyer';

interface ShippingCardProps {
  option: ShippingOption;
  selected: boolean;
  onSelect: () => void;
}

export const ShippingCard = ({ option, selected, onSelect }: ShippingCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
        selected
          ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
          : 'border-primary/10 bg-white hover:border-primary/20 hover:shadow-sm'
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-lg p-2 ${
          selected ? 'bg-secondary text-white' : 'bg-primary/5 text-primary'
        }`}
      >
        <Package className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${selected ? 'text-secondary' : 'text-neutral'}`}>
          {option.name}
        </p>
        <p className="text-xs text-neutral/50">{option.service}</p>
        <div className="mt-1 flex items-center gap-2 text-xs text-neutral/50">
          <Clock className="h-3 w-3" />
          <span>{option.estimatedDays}</span>
        </div>
      </div>

      <p className={`text-sm font-bold ${selected ? 'text-secondary' : 'text-primary'}`}>
        Rp{option.cost.toLocaleString('id-ID')}
      </p>
    </button>
  );
};

export default ShippingCard;
