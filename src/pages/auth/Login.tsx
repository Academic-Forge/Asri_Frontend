import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';
import { loginSchema } from '../../schemas/authSchema';
import type { LoginInput } from '../../schemas/authSchema';
import { authService } from '../../services/authService';
import logoAsri from '../../assets/img/logo-asri-2.webp';
import daunPepaya from '../../assets/img/daun-pepaya.jpg';
import { FormInput } from '../../components/ui/FormInput';

/**
 * Premium Split-Screen Login Page for ASRI.
 * Matches the register UI using primary and secondary greens and daun-pepaya.jpg background.
 */
export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      await authService.login(data);
      toast.success('Login berhasil!');
      toast('Menavigasi ke beranda...', { icon: '🚀' });
      navigate('/');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errMsg = err.response?.data?.message || err.message || 'Login gagal';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-slate-50 lg:overflow-hidden">
      
      {/* LEFT PANEL: Branding & Visuals (Hidden on mobile/tablet, flex on lg and up) */}
      <div
        className="hidden lg:flex lg:w-5/12 text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden bg-cover bg-center h-full shrink-0"
        style={{ backgroundImage: `linear-gradient(to bottom right, rgba(6, 78, 59, 0.8), rgba(2, 35, 27, 0.85)), url(${daunPepaya})` }}
      >
        {/* Glow blobs for premium visual design */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#10b981]/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#10b981]/15 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Organic plant pattern overlay (SVG) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Brand Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
            <img src={logoAsri} alt="ASRI Logo" className="h-9 w-auto object-contain" />
          </div>
          <span className="text-xl font-bold tracking-wider">ASRI E-Commerce</span>
        </div>

        {/* Central Marketing Copy */}
        <div className="space-y-6 max-w-md relative z-10 my-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 uppercase">
            Selamat Datang Kembali
          </span>
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
            Dukung Ekonomi Lokal, Langsung Dari Produsen.
          </h1>
          <p className="text-slate-300 text-sm xl:text-base leading-relaxed">
            Masuk untuk melanjutkan transaksi Anda, mengelola toko, atau memverifikasi produk berkualitas terbaik langsung di ekosistem ASRI.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl">
              <span className="block text-2xl xl:text-3xl font-extrabold text-[#10b981]">10k+</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Transaksi Sukses</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl">
              <span className="block text-2xl xl:text-3xl font-extrabold text-[#10b981]">4.9★</span>
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

      {/* RIGHT PANEL: Form Area (Mobile First) */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-8 xl:p-12 py-8 lg:py-12 bg-white lg:bg-slate-50/30 overflow-y-auto h-full">
        <div className="w-full max-w-md bg-white rounded-3xl border-0 lg:border lg:border-slate-100 lg:shadow-2xl lg:shadow-slate-900/5 p-6 sm:p-10 space-y-8">
          
          {/* Greeting Header */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-4">
              <img src={logoAsri} alt="ASRI Logo" className="h-14 w-auto object-contain" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Selamat Datang</h2>
            <p className="text-sm text-slate-500 font-medium">Silakan masuk menggunakan akun terdaftar Anda.</p>
          </div>

          {/* Social Sign-In Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer hover:border-slate-300 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span className="text-slate-700">Masuk dengan Google</span>
          </button>

          {/* Visual Separator */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative px-4 text-[10px] font-bold text-slate-400 bg-white uppercase tracking-wider">
              Atau masuk dengan email
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Alamat Email"
              id="email"
              type="email"
              placeholder="contoh@domain.com"
              icon={<Mail size={18} />}
              register={register('email')}
              error={errors.email?.message}
            />

            <div className="space-y-1">
              <FormInput
                label="Kata Sandi"
                id="password"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={18} />}
                register={register('password')}
                error={errors.password?.message}
              />
              <div className="flex justify-end pt-1">
                <span className="text-xs font-bold text-primary hover:underline cursor-pointer">
                  Lupa sandi?
                </span>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-secondary/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none bg-primary hover:bg-primary-hover text-white py-3 text-sm shadow-lg shadow-primary/20 cursor-pointer mt-6"
            >
              {isLoading ? 'Memproses Masuk...' : 'Masuk Sekarang'}
            </button>
          </form>

          {/* Toggle navigation */}
          <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
            Belum memiliki akun?{' '}
            <Link to="/register" className="font-extrabold text-primary hover:underline">
              Daftar Akun Baru
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
