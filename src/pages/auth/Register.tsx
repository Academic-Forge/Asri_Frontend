import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShoppingBag, Store, Truck, ShieldCheck } from 'lucide-react';
// import logoAsri from '../../assets/img/logo-asri.webp';
import daunPepaya from '../../assets/img/daun-pepaya.jpg';

// Sub-form components
import BuyerRegisterForm from '../../components/auth/BuyerRegisterForm';
import SellerRegisterForm from '../../components/auth/SellerRegisterForm';
import DriverRegisterForm from '../../components/auth/DriverRegisterForm';
import ValidatorRegisterForm from '../../components/auth/ValidatorRegisterForm';

// Schemas & Types
import type {
  BuyerRegisterInput,
  SellerRegisterInput,
  DriverRegisterInput,
  ValidatorRegisterInput,
} from '../../schemas/authSchema';
import { authService } from '../../services/authService';

type RoleType = 'buyer' | 'seller' | 'driver' | 'validator';

export const Register = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<RoleType>('buyer');
  const [isLoading, setIsLoading] = useState(false);

  // Helper to submit general account details to API, and mock other profile details
  const handleRegisterSubmit = async (
    data:
      | BuyerRegisterInput
      | SellerRegisterInput
      | DriverRegisterInput
      | ValidatorRegisterInput
  ) => {
    setIsLoading(true);
    try {
      // 1. Submit basic account info to the auth service
      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
      });

      // 2. Log profile details to console to simulate backend profile creation
      console.log(`Registered as ${activeRole.toUpperCase()} with profile:`, data);

      toast.success(`Registrasi ${activeRole.toUpperCase()} Berhasil!`);
      toast('Silakan masuk ke akun baru Anda.', { icon: '🔑' });
      navigate('/login');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errMsg = err.response?.data?.message || err.message || 'Pendaftaran gagal';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const renderActiveForm = () => {
    switch (activeRole) {
      case 'buyer':
        return (
          <BuyerRegisterForm
            onSubmit={(data: BuyerRegisterInput) => handleRegisterSubmit(data)}
            isLoading={isLoading}
          />
        );
      case 'seller':
        return (
          <SellerRegisterForm
            onSubmit={(data: SellerRegisterInput) => handleRegisterSubmit(data)}
            isLoading={isLoading}
          />
        );
      case 'driver':
        return (
          <DriverRegisterForm
            onSubmit={(data: DriverRegisterInput) => handleRegisterSubmit(data)}
            isLoading={isLoading}
          />
        );
      case 'validator':
        return (
          <ValidatorRegisterForm
            onSubmit={(data: ValidatorRegisterInput) => handleRegisterSubmit(data)}
            isLoading={isLoading}
          />
        );
      default:
        return null;
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
       
          <span className="text-xl font-bold tracking-wider">ASRI E-Commerce</span>
        </div>

        {/* Central Marketing Copy */}
        <div className="space-y-6 max-w-md relative z-10 my-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 uppercase">
            Platform Terintegrasi
          </span>
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight">
            Ecological Trust.<br />Digital Stability.
          </h1>
          <p className="text-slate-300 text-sm xl:text-base leading-relaxed">
            Bergabunglah dengan ekosistem perdagangan digital langsung ASRI untuk berpartisipasi dalam transaksi yang aman, berkelanjutan, dan transparan dari produsen asli.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl">
              <span className="block text-2xl xl:text-3xl font-extrabold text-[#10b981]">100%</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Produsen Asli</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl">
              <span className="block text-2xl xl:text-3xl font-extrabold text-[#10b981]">In-House</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Delivery System</span>
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
      <div className="flex-1 flex items-start justify-center p-4 sm:p-8 md:p-12 lg:p-8 xl:p-12 py-8 lg:py-12 bg-white lg:bg-slate-50/30 overflow-y-auto h-full">
        <div className="w-full max-w-2xl bg-white rounded-3xl border-0 lg:border lg:border-slate-100 lg:shadow-2xl lg:shadow-slate-900/5 p-6 sm:p-10 space-y-8">
          
          {/* Greeting Header */}
          <div className="space-y-2 text-center lg:text-left">
         
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Daftar Akun Baru</h2>
            <p className="text-sm text-slate-500 font-medium">Pilih peran Anda untuk mulai menggunakan ekosistem ASRI.</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block text-center lg:text-left">
              Mendaftar Sebagai
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'buyer', label: 'Buyer', icon: <ShoppingBag size={16} /> },
                { id: 'seller', label: 'Seller', icon: <Store size={16} /> },
                { id: 'driver', label: 'Driver', icon: <Truck size={16} /> },
                { id: 'validator', label: 'Validator', icon: <ShieldCheck size={16} /> },
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveRole(role.id as RoleType)}
                  className={`flex items-center justify-start p-2 rounded-xl border transition-all duration-200 cursor-pointer gap-2.5 group w-full ${
                    activeRole === role.id
                      ? 'border-primary bg-primary/5 text-primary shadow-sm'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/50 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg transition-colors duration-200 shrink-0 ${
                      activeRole === role.id ? 'bg-primary text-white' : 'bg-white text-slate-500 group-hover:text-primary border border-slate-100'
                    }`}
                  >
                    {role.icon}
                  </div>
                  <span className="text-xs font-bold tracking-wide">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Divider / Google OAuth Option */}
          <div className="space-y-4">
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
              <span className="text-slate-700">Daftar menggunakan Google</span>
            </button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <span className="relative px-4 text-[10px] font-bold text-slate-400 bg-white uppercase tracking-wider">
                Atau isi detail formulir
              </span>
            </div>
          </div>

          {/* Render Active Form with animation container */}
          <div className="transition-all duration-300">
            {renderActiveForm()}
          </div>

          {/* Toggle navigation */}
          <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100">
            Sudah memiliki akun?{' '}
            <Link to="/login" className="font-extrabold text-primary hover:underline">
              Masuk Disini
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Register;
