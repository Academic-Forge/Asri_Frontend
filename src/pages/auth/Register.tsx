// src/pages/auth/Register.tsx
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ShoppingBag, Store, Truck, ShieldCheck,
  User, Mail, Lock, Phone, MapPin, Building2,
  Upload, X, Eye, EyeOff, ArrowRight, CheckCircle2,
} from 'lucide-react';

import { registerSchema, type RegisterInput } from '../../schemas/authSchema';
import { authService } from '../../services/authService';
import logoAsri from '../../assets/img/logo-asri.webp';
import daunPepaya from '../../assets/img/daun-pepaya.jpg';

// ─── Types ────────────────────────────────────────────────────────────────────
type RoleId = 'buyer' | 'seller' | 'driver' | 'validator';

interface FileState {
  ktp: File | null;
  selfie: File | null;
  sim: File | null;
  stnk: File | null;
  bpkb: File | null;
  business_license: File | null;
  business_photo: File | null;
}

// ─── File Upload Component ────────────────────────────────────────────────────
interface FileUploadProps {
  label: string;
  hint: string;
  accept?: string;
  value: File | null;
  onChange: (file: File | null) => void;
}

const FileUploadField = ({ label, hint, accept = 'image/*', value, onChange }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }
    onChange(file);
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      {value ? (
        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
          <CheckCircle2 className="h-4 w-4 text-[#10b981] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#064e3b] truncate">{value.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{(value.size / 1024).toFixed(1)} KB</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="p-1 hover:bg-red-50 rounded-lg transition-colors group"
          >
            <X className="h-3.5 w-3.5 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          className={`w-full p-3.5 border-2 border-dashed rounded-xl text-center transition-all duration-200 cursor-pointer ${
            isDragging
              ? 'border-[#10b981] bg-emerald-50'
              : 'border-gray-200 bg-gray-50/50 hover:border-[#10b981]/50 hover:bg-emerald-50/30'
          }`}
        >
          <Upload className={`h-4 w-4 mx-auto mb-1 transition-colors ${isDragging ? 'text-[#10b981]' : 'text-gray-300'}`} />
          <p className="text-xs font-medium text-gray-500">Klik atau seret file</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{hint}</p>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
};

// ─── Password Strength ────────────────────────────────────────────────────────
const getPasswordStrength = (pw: string) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: 'Lemah', color: '#ef4444' },
    { label: 'Cukup', color: '#f59e0b' },
    { label: 'Baik', color: '#10b981' },
    { label: 'Kuat', color: '#064e3b' },
  ];
  return { score, ...(levels[Math.min(score - 1, 3)] ?? { label: '', color: '' }) };
};

// ─── Roles Config ─────────────────────────────────────────────────────────────
const ROLES = [
  {
    id: 'buyer' as RoleId,
    label: 'Buyer',
    desc: 'Beli langsung dari produsen',
    icon: ShoppingBag,
    badge: 'Populer',
  },
  {
    id: 'seller' as RoleId,
    label: 'Seller',
    desc: 'Jual produk di ASRI',
    icon: Store,
    badge: null,
  },
  {
    id: 'driver' as RoleId,
    label: 'Driver',
    desc: 'Mitra pengiriman ASRI',
    icon: Truck,
    badge: null,
  },
  {
    id: 'validator' as RoleId,
    label: 'Validator',
    desc: 'Verifikasi kualitas produk',
    icon: ShieldCheck,
    badge: null,
  },
] as const;

// ─── Main Component ───────────────────────────────────────────────────────────
export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [files, setFiles] = useState<FileState>({
    ktp: null, selfie: null, sim: null,
    stnk: null, bpkb: null,
    business_license: null, business_photo: null,
  });

  const setFile = (key: keyof FileState, file: File | null) =>
    setFiles((prev) => ({ ...prev, [key]: file }));

  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<RegisterInput>({
      resolver: zodResolver(registerSchema),
      defaultValues: { role: 'buyer' },
    });

  const currentRole = watch('role') as RoleId;
  const passwordValue = watch('password') ?? '';
  const pwStrength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      toast.success('Akun berhasil dibuat! Silakan masuk.');
      navigate('/login');
    } catch (error: any) {
      const msg = error.response?.data?.message ?? 'Registrasi gagal. Coba lagi.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Input class helper ───────────────────────────────────────────────────
  const inputCls = (hasError?: boolean) =>
    `w-full py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10b981]/25 focus:border-[#10b981] transition-all placeholder-gray-300 ${
      hasError ? 'border-red-300 focus:border-red-400 focus:ring-red-200/40' : 'border-gray-200'
    }`;

  return (
    <div className="min-h-screen flex bg-[#f0fdf4]">

      {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[42%] relative overflow-hidden flex-col flex-shrink-0">
        {/* Image */}
        <img
          src={daunPepaya}
          alt="Daun Pepaya"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b]/96 via-[#064e3b]/80 to-[#10b981]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/90 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12 xl:p-14 justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2.5 shadow-lg">
              <img src={logoAsri} alt="ASRI" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <span className="text-white font-extrabold text-lg tracking-wide block leading-none">ASRI</span>
              <span className="text-[#10b981] text-[10px] font-semibold tracking-widest uppercase">Asli Dari</span>
            </div>
          </div>

          {/* Main copy */}
          <div className="space-y-8">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                Ekosistem Digital Terpercaya
              </span>
              <h1 className="text-4xl xl:text-[2.6rem] font-extrabold text-white leading-[1.15] tracking-tight">
                Ecological Trust.<br />
                <span className="text-[#10b981]">Digital Stability.</span>
              </h1>
              <p className="text-gray-300 text-sm xl:text-base leading-relaxed max-w-xs">
                Bergabunglah dalam ekosistem perdagangan ASRI — menghubungkan produsen langsung ke konsumen, aman dan transparan.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: '10k+', lbl: 'Transaksi Sukses' },
                { val: '4.9★', lbl: 'Rating Kepuasan' },
                { val: '500+', lbl: 'Produsen Aktif' },
                { val: '100%', lbl: 'Terverifikasi' },
              ].map((s) => (
                <div
                  key={s.lbl}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/8 transition-colors"
                >
                  <div className="text-xl font-extrabold text-[#10b981]">{s.val}</div>
                  <div className="text-[11px] text-gray-400 font-medium mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {['End-to-End Encrypted', 'KYC Verified', 'In-House Delivery'].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/8 border border-white/10 text-[10px] text-gray-300 font-medium"
                >
                  <CheckCircle2 className="h-3 w-3 text-[#10b981]" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-gray-600">© 2026 ASRI. Semua hak dilindungi.</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-start justify-center overflow-y-auto min-h-screen">
        <div className="w-full max-w-[520px] px-6 sm:px-10 py-10 space-y-6">

          {/* Mobile Logo */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <img src={logoAsri} alt="ASRI" className="h-8 w-auto object-contain" />
            <span className="font-extrabold text-[#064e3b] text-lg">ASRI</span>
          </div>

          {/* Header */}
          <div>
            <div className="hidden lg:flex items-center gap-2.5 mb-5">
              <img src={logoAsri} alt="ASRI" className="h-7 w-auto object-contain" />
              <span className="font-extrabold text-[#064e3b]">ASRI</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Buat Akun Baru</h2>
            <p className="text-sm text-gray-400 mt-1">Pilih peran Anda untuk memulai bersama ASRI.</p>
          </div>

          {/* ── ROLE SELECTOR ──────────────────────────────────────────────── */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Saya bergabung sebagai</p>
            <div className="grid grid-cols-2 gap-2.5">
              {ROLES.map(({ id, label, desc, icon: Icon, badge }) => {
                const active = currentRole === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setValue('role', id, { shouldValidate: true })}
                    className={`relative flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group ${
                      active
                        ? 'border-[#10b981] bg-[#064e3b] shadow-lg shadow-[#064e3b]/15'
                        : 'border-gray-100 bg-white hover:border-[#10b981]/40 hover:shadow-md hover:shadow-gray-100'
                    }`}
                  >
                    {badge && (
                      <span className="absolute -top-2 -right-1 px-1.5 py-0.5 text-[9px] font-bold bg-[#10b981] text-white rounded-full">
                        {badge}
                      </span>
                    )}
                    <div className={`p-2 rounded-xl flex-shrink-0 transition-colors ${
                      active ? 'bg-[#10b981]/20' : 'bg-gray-50 group-hover:bg-emerald-50'
                    }`}>
                      <Icon className={`h-4.5 w-4.5 transition-colors ${active ? 'text-[#10b981]' : 'text-gray-400 group-hover:text-[#10b981]'}`} style={{ height: '18px', width: '18px' }} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold leading-none ${active ? 'text-white' : 'text-gray-800'}`}>{label}</p>
                      <p className={`text-[11px] mt-1 leading-tight ${active ? 'text-emerald-300' : 'text-gray-400'}`}>{desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── FORM ───────────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Section: Informasi Akun */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="h-px bg-gray-100 flex-1" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex-shrink-0">Informasi Akun</span>
                <div className="h-px bg-gray-100 flex-1" />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className={`${inputCls(!!errors.name)} pl-10 pr-4`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="kamu@contoh.com"
                    className={`${inputCls(!!errors.email)} pl-10 pr-4`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Buat password yang kuat"
                    className={`${inputCls(!!errors.password)} pl-10 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Strength meter */}
                {passwordValue.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((lvl) => (
                        <div
                          key={lvl}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{ backgroundColor: pwStrength.score >= lvl ? pwStrength.color : '#e5e7eb' }}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] font-semibold" style={{ color: pwStrength.color }}>
                      Kekuatan: {pwStrength.label}
                    </p>
                  </div>
                )}
                {errors.password && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.password.message}</p>}
              </div>
            </div>

            {/* ── ROLE SPECIFIC FIELDS ─────────────────────────────────────── */}

            {/* BUYER */}
            {currentRole === 'buyer' && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-gray-100 flex-1" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex-shrink-0 flex items-center gap-1.5">
                    <ShoppingBag className="h-3 w-3" /> Profil Pembeli
                  </span>
                  <div className="h-px bg-gray-100 flex-1" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nomor Telepon</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                    <input
                      {...register('phone' as any)}
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      className={`${inputCls()} pl-10 pr-4`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Alamat Pengiriman</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-gray-300 pointer-events-none" />
                    <textarea
                      {...register('address' as any)}
                      rows={2}
                      placeholder="Masukkan alamat lengkap pengiriman"
                      className={`${inputCls()} pl-10 pr-4 resize-none`}
                    />
                  </div>
                </div>

                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex gap-2.5">
                  <span className="text-base flex-shrink-0">🪪</span>
                  <div>
                    <p className="text-xs font-bold text-blue-700">Verifikasi Identitas</p>
                    <p className="text-[11px] text-blue-500 mt-0.5">Upload dokumen untuk mengaktifkan akun pembeli Anda.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FileUploadField
                    label="Foto KTP"
                    hint="JPG/PNG · maks 5MB"
                    value={files.ktp}
                    onChange={(f) => setFile('ktp', f)}
                  />
                  <FileUploadField
                    label="Foto Selfie + KTP"
                    hint="Wajah jelas · maks 5MB"
                    value={files.selfie}
                    onChange={(f) => setFile('selfie', f)}
                  />
                </div>
              </div>
            )}

            {/* SELLER */}
            {currentRole === 'seller' && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-gray-100 flex-1" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex-shrink-0 flex items-center gap-1.5">
                    <Store className="h-3 w-3" /> Profil Bisnis
                  </span>
                  <div className="h-px bg-gray-100 flex-1" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Toko / Bisnis</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                    <input
                      {...register('business_name' as any)}
                      type="text"
                      placeholder="Contoh: UD. Hijau Segar"
                      className={`${inputCls()} pl-10 pr-4`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Alamat Bisnis</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-gray-300 pointer-events-none" />
                    <textarea
                      {...register('business_address' as any)}
                      rows={2}
                      placeholder="Alamat lengkap toko/gudang"
                      className={`${inputCls()} pl-10 pr-4 resize-none`}
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2.5">
                  <span className="text-base flex-shrink-0">📋</span>
                  <div>
                    <p className="text-xs font-bold text-amber-700">Dokumen Verifikasi Seller</p>
                    <p className="text-[11px] text-amber-600 mt-0.5">Status toko akan menjadi <b>pending</b> sampai dokumen diverifikasi tim ASRI.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FileUploadField
                    label="Foto KTP Pemilik"
                    hint="JPG/PNG · maks 5MB"
                    value={files.ktp}
                    onChange={(f) => setFile('ktp', f)}
                  />
                  <FileUploadField
                    label="Surat Izin Usaha"
                    hint="PDF/JPG · maks 5MB"
                    accept=".pdf,image/*"
                    value={files.business_license}
                    onChange={(f) => setFile('business_license', f)}
                  />
                </div>

                <FileUploadField
                  label="Foto Tempat Usaha"
                  hint="Tampak depan toko/gudang · JPG/PNG · maks 5MB"
                  value={files.business_photo}
                  onChange={(f) => setFile('business_photo', f)}
                />
              </div>
            )}

            {/* DRIVER */}
            {currentRole === 'driver' && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-gray-100 flex-1" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex-shrink-0 flex items-center gap-1.5">
                    <Truck className="h-3 w-3" /> Profil Driver
                  </span>
                  <div className="h-px bg-gray-100 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nomor Telepon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                      <input
                        {...register('phone' as any)}
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        className={`${inputCls()} pl-9 pr-3`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Plat Nomor</label>
                    <div className="relative">
                      <Truck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                      <input
                        {...register('vehicle_number' as any)}
                        type="text"
                        placeholder="B 1234 ABC"
                        className={`${inputCls()} pl-9 pr-3`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-2.5">
                  <span className="text-base flex-shrink-0">⚠️</span>
                  <div>
                    <p className="text-xs font-bold text-red-700">Dokumen Wajib</p>
                    <p className="text-[11px] text-red-500 mt-0.5">Semua dokumen harus valid dan terbaca jelas untuk verifikasi.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FileUploadField
                    label="Foto KTP"
                    hint="JPG/PNG · maks 5MB"
                    value={files.ktp}
                    onChange={(f) => setFile('ktp', f)}
                  />
                  <FileUploadField
                    label="Foto SIM (A/B/C)"
                    hint="Masih aktif · maks 5MB"
                    value={files.sim}
                    onChange={(f) => setFile('sim', f)}
                  />
                  <FileUploadField
                    label="Foto STNK"
                    hint="STNK kendaraan · maks 5MB"
                    value={files.stnk}
                    onChange={(f) => setFile('stnk', f)}
                  />
                  <FileUploadField
                    label="Foto BPKB"
                    hint="BPKB kendaraan · maks 5MB"
                    value={files.bpkb}
                    onChange={(f) => setFile('bpkb', f)}
                  />
                </div>

                <FileUploadField
                  label="Foto Selfie dengan KTP"
                  hint="Wajah jelas + KTP terlihat · JPG/PNG · maks 5MB"
                  value={files.selfie}
                  onChange={(f) => setFile('selfie', f)}
                />
              </div>
            )}

            {/* VALIDATOR */}
            {currentRole === 'validator' && (
              <div className="rounded-2xl border border-[#10b981]/20 bg-gradient-to-br from-emerald-50 to-[#f0fdf4] p-5 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#064e3b]/10 mx-auto">
                  <ShieldCheck className="h-6 w-6 text-[#064e3b]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#064e3b]">Akun Validator</p>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                    Validator bertugas memverifikasi kualitas produk dari seller. Akun Anda akan ditinjau dan diaktifkan secara manual oleh tim ASRI setelah registrasi berhasil.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 text-left bg-white/60 rounded-xl p-3 border border-[#10b981]/10">
                  {['Terima notifikasi tugas verifikasi', 'Akses panel verifikasi produk', 'Laporan langsung ke admin'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10b981] flex-shrink-0" />
                      <span className="text-xs text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#064e3b] hover:bg-[#064e3b]/90 active:scale-[0.99] text-white font-bold text-sm rounded-2xl shadow-lg shadow-[#064e3b]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Membuat Akun...
                </>
              ) : (
                <>
                  Buat Akun Sekarang
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium flex-shrink-0">atau daftar dengan</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-gray-50 active:scale-[0.99] text-sm font-semibold text-gray-700 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Lanjutkan dengan Google
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 pb-4">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="text-[#064e3b] hover:text-[#10b981] font-bold transition-colors underline underline-offset-2"
            >
              Masuk sekarang
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;