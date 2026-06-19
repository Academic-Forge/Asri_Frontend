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
    <section className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      <div className="animate-fade-in relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 sm:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-medium uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            Dashboard
          </div>
          <h1 className="mt-2 text-xl sm:text-3xl font-bold text-white">
            Selamat Datang, {user?.name ?? 'User'}!
          </h1>
          <p className="mt-1 text-sm sm:text-base text-white/70">
            Kelola dan pantau aktivitas ASRI dengan mudah.
          </p>
        </div>
        <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-white/5 sm:h-48 sm:w-48" />
        <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/5 sm:h-36 sm:w-36" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {stats.map((item, i) => (
          <div
            key={item.label}
            className="animate-slide-up rounded-xl border border-primary/10 bg-white p-4 sm:p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-lg p-2 sm:p-2.5 ${item.color} transition-transform group-hover:scale-110`}>
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
            </div>
            <p className="mt-4 text-2xl sm:text-3xl font-bold text-neutral">{item.value}</p>
            <p className="mt-1 text-xs sm:text-sm text-neutral/50">{item.label}</p>
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
