import { useState } from 'react';
import type { User } from '../../types/user';
import AdminDashboard from './AdminDashboard';
import ValidatorDashboard from './ValidatorDashboard';
import toast from 'react-hot-toast';
import Icon from '../../components/ui/Icon';

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? (JSON.parse(stored) as User) : null;
};

export const Dashboard = () => {
  const [user] = useState<User | null>(getStoredUser);
  const [activeRole, setActiveRole] = useState<'admin' | 'validator'>(() => {
    const storedUser = getStoredUser();
    return storedUser?.role === 'validator' ? 'validator' : 'admin';
  });

  const handleRoleChange = (role: 'admin' | 'validator') => {
    setActiveRole(role);
    toast(`Beralih ke Dashboard ${role === 'admin' ? 'Admin' : 'Validator'}`, {
      icon: role === 'admin' ? '🛡️' : '🔍',
    });
  };

  return (
    <section className="space-y-6">
      {/* Dev Mode Role Toggle (Solid Optimized Banner) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-outline-variant shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/15 rounded-xl text-secondary">
            <Icon name="account_tree" size={20} className="text-secondary" />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">Peralih Demo Dashboard</p>
            <p className="text-xs text-on-surface-variant font-medium">
              Masuk sebagai <span className="font-semibold text-primary">{user?.name || 'Tamu'}</span> ({user?.role || 'Tanpa Peran'})
            </p>
          </div>
        </div>

        {/* Dynamic Pills Selector */}
        <div className="flex bg-surface-container border border-outline-variant rounded-xl p-1 shrink-0">
          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide cursor-pointer ${
              activeRole === 'admin'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="dashboard" size={16} />
            Portal Admin
          </button>
          <button
            onClick={() => handleRoleChange('validator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide cursor-pointer ${
              activeRole === 'validator'
                ? 'bg-secondary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="verified_user" size={16} />
            Pusat Validator
          </button>
        </div>
      </div>

      {/* Render Selected Dashboard */}
      <div className="animate-fade-in">
        {activeRole === 'admin' ? <AdminDashboard /> : <ValidatorDashboard />}
      </div>
    </section>
  );
};

export default Dashboard;
