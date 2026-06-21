import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  homeTo?: string;
}

export const Breadcrumbs = ({ items, homeTo }: BreadcrumbsProps) => {
  const getStoredUser = () => {
    const stored = localStorage.getItem('user');
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };
  const user = getStoredUser();
  const defaultHome = user?.role === 'buyer' ? '/buyer/search' : '/dashboard';
  const resolvedHome = homeTo || defaultHome;

  return (
    <nav className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 sm:mt-5 mb-4 sm:mb-6">
      <Link to={resolvedHome} className="hover:text-primary transition-colors flex items-center gap-1">
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
