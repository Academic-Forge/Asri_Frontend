import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User as UserIcon, Mail, Lock } from 'lucide-react';
import { registerSchema } from '../../schemas/authSchema';
import type { RegisterInput } from '../../schemas/authSchema';
import { authService } from '../../services/authService';
import logoAsri from '../../assets/img/logo-asri.webp';

/**
 * Premium Split-Screen Register Page for ASRI.
 * Colors: Primary Army Green (#4B5320) & Accent Lime Green (#A3E635).
 */
export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      // confirmPassword is only for UI verification, we omit it when posting to backend
      const { confirmPassword, ...registerData } = data;
      await authService.register(registerData);
      toast.success('Pendaftaran berhasil! Silakan masuk.');
      navigate('/login');
    } catch (error: any) {
      const errMsg = error.response?.data?.message || error.message || 'Pendaftaran gagal';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      
      {/* LEFT PANEL: Branding & Visuals (Hidden on mobile, flex on md and up) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#4B5320] to-[#20240d] text-white p-12 lg:p-20 flex-col justify-between relative overflow-hidden">
        {/* Decorative background glow blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#A3E635]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
            <img src={logoAsri} alt="ASRI Logo" className="h-10 w-auto object-contain" />
          </div>
          <span className="text-xl font-bold tracking-wider">ASRI E-Commerce</span>
        </div>

        {/* Central Marketing Copy */}
        <div className="space-y-6 max-w-lg relative z-10 my-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30 uppercase">
            Produk Lokal & Premium
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Tempat Terbaik Belanja Produk Unggulan.
          </h1>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
            Dukung gerakan ekonomi lokal dengan membeli produk berkualitas langsung dari produsen terpercaya. Transparan, aman, dan berkualitas tinggi.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
              <span className="block text-2xl lg:text-3xl font-extrabold text-[#A3E635]">10k+</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Transaksi Sukses</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
              <span className="block text-2xl lg:text-3xl font-extrabold text-[#A3E635]">4.9★</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Kepuasan Mitra</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-slate-400 relative z-10 flex justify-between">
          <span>&copy; 2026 ASRI E-Commerce.</span>
          <span>Semua Hak Dilindungi.</span>
        </div>
      </div>

      {/* RIGHT PANEL: Form Area */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white md:bg-slate-50/30">
        <div className="w-full max-w-md bg-white rounded-3xl border-0 md:border md:border-slate-100 md:shadow-2xl md:shadow-slate-900/5 p-8 sm:p-10 space-y-6">
          
          {/* Greeting Header */}
          <div className="space-y-2 text-center md:text-left">
            <div className="md:hidden flex justify-center mb-4">
              <img src={logoAsri} alt="ASRI Logo" className="h-16 w-auto object-contain" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Daftar Akun Baru</h2>
            <p className="text-sm text-slate-500 font-medium">Buat akun untuk mulai menggunakan platform ASRI.</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name input field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Nama Lengkap
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <UserIcon size={18} />
                </span>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#4B5320] focus:ring-4 focus:ring-[#4B5320]/10 transition-all duration-200 ${
                    errors.name ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : ''
                  }`}
                  {...register('name')}
                />
              </div>
              {errors.name && (
                <span className="text-xs text-rose-600 font-semibold">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email input field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Alamat Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="contoh@domain.com"
                  className={`w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#4B5320] focus:ring-4 focus:ring-[#4B5320]/10 transition-all duration-200 ${
                    errors.email ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : ''
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <span className="text-xs text-rose-600 font-semibold">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password input field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Kata Sandi
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#4B5320] focus:ring-4 focus:ring-[#4B5320]/10 transition-all duration-200 ${
                    errors.password ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : ''
                  }`}
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <span className="text-xs text-rose-600 font-semibold">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password input field */}
            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="confirmPassword" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#4B5320] focus:ring-4 focus:ring-[#4B5320]/10 transition-all duration-200 ${
                    errors.confirmPassword ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10' : ''
                  }`}
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-xs text-rose-600 font-semibold">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#A3E635]/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-[#4B5320] to-[#383e18] hover:from-[#3a4019] hover:to-[#282d11] text-white py-3 text-sm shadow-lg shadow-[#4B5320]/20 cursor-pointer mt-6"
            >
              {isLoading ? 'Memproses Daftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          {/* Visual Separator */}
          <div className="relative flex items-center justify-center py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-3 text-[10px] font-bold text-slate-400 bg-white uppercase tracking-wider">
              Atau daftar dengan
            </span>
          </div>

          {/* Social Register Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer hover:border-slate-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span className="text-slate-700">Google</span>
          </button>

          {/* Toggle navigation */}
          <div className="text-center text-sm text-slate-500 pt-2">
            Sudah memiliki akun?{' '}
            <Link to="/login" className="font-extrabold text-[#4B5320] hover:underline">
              Masuk Disini
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Register;
