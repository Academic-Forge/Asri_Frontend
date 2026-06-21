import { useState } from 'react';
import { Users, Activity, Clock, ArrowRight, Sparkles } from 'lucide-react';
import type { User } from '../../types/user';

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? (JSON.parse(stored) as User) : null;
};

const stats = [
  { icon: Users, label: 'Total Pengguna', value: '---', color: 'text-secondary bg-secondary/10' },
  { icon: Activity, label: 'Aktif Hari Ini', value: '---', color: 'text-primary bg-primary/10' },
  { icon: Clock, label: 'Menunggu Review', value: '---', color: 'text-amber-600 bg-amber-50' },
];

export const Dashboard = () => {
  const [user] = useState<User | null>(getStoredUser);

  return (
    <section className="space-y-6 sm:space-y-8 w-full animate-fade-in">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 sm:p-10 shadow-md">
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 text-white/90 text-sm sm:text-base font-extrabold uppercase tracking-wider">
            <Sparkles className="h-5 w-5 text-secondary" />
            Dashboard
          </div>
          <h1 className="mt-3.5 text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Selamat Datang, {user?.name ?? 'User'}!
          </h1>
          <p className="mt-2 text-sm sm:text-lg text-white/80 max-w-xl leading-relaxed">
            Kelola dan pantau aktivitas ASRI dengan mudah.
          </p>
        </div>
        <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-white/5 sm:h-48 sm:w-48 animate-pulse" />
        <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/5 sm:h-36 sm:w-36 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {stats.map((item, i) => (
          <div
            key={item.label}
            className="animate-slide-up rounded-2xl border border-primary/10 bg-white p-6 sm:p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-xl p-3 sm:p-3.5 ${item.color} transition-transform group-hover:scale-110 shadow-sm`}>
                <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </span>
            </div>
            <p className="mt-5 text-3xl sm:text-4xl font-extrabold text-neutral tracking-tight">{item.value}</p>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral/50 font-bold uppercase tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>

      <div
        className="animate-slide-up rounded-xl border border-primary/10 bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-md"
        style={{ animationDelay: '300ms', animationFillMode: 'both' }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-neutral">Aktivitas Terbaru</h2>
          <button className="flex items-center gap-1 text-xs sm:text-sm font-medium text-secondary transition-all hover:gap-2 hover:text-primary">
            Lihat Semua
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-neutral/40 py-8 sm:py-12">
          Belum ada aktivitas terbaru. Data akan muncul setelah sistem berjalan.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
