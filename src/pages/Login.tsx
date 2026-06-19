import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginSchema } from '../schemas/authSchema';
import type { LoginInput } from '../schemas/authSchema';
import { authService } from '../services/authService';

/**
  
 */
export const Login = () => {
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
      toast('Menavigasi ke halaman utama...', { icon: '🚀' });
    } catch (error: any) {
      const errMsg = error.response?.data?.message || error.message || 'Login gagal';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-6">
        
        {/* Branding header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            ASRI
          </h1>
          <h2 className="text-2xl font-bold text-slate-800">Masuk ke Akun</h2>
          <p className="text-sm text-slate-500">Silakan masukkan email dan kata sandi Anda</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email input field */}
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Alamat Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="nama@email.com"
              className={`px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 ${
                errors.email ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
              }`}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-xs text-rose-600 font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password input field */}
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Kata Sandi
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 ${
                errors.password ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
              }`}
              {...register('password')}
            />
            {errors.password && (
              <span className="text-xs text-rose-600 font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 px-4 py-2 text-sm shadow-md shadow-emerald-500/10 cursor-pointer"
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="text-center text-sm text-slate-500 pt-2">
          Belum memiliki akun?{' '}
          <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
            Daftar Sekarang
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
