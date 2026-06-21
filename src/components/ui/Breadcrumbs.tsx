import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 sm:mt-5 mb-4 sm:mb-6">
      <Link to="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home size={11} className="text-slate-400" />
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <ChevronRight size={10} className="text-slate-300" />
          {item.to ? (
            <Link to={item.to} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-500 font-extrabold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
