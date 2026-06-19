import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Phone, Store, Landmark, CreditCard } from 'lucide-react';
import { sellerRegisterSchema } from '../../schemas/authSchema';
import type { SellerRegisterInput } from '../../schemas/authSchema';
import { FormInput } from '../ui/FormInput';
import { TextAreaInput } from '../ui/TextAreaInput';

interface SellerRegisterFormProps {
  onSubmit: (data: SellerRegisterInput) => void;
  isLoading: boolean;
}

export const SellerRegisterForm: React.FC<SellerRegisterFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerRegisterInput>({
    resolver: zodResolver(sellerRegisterSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Account Info Section Header */}
      <div className="border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold text-primary">Informasi Akun</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Nama Lengkap"
          id="name"
          placeholder="John Doe"
          icon={<User size={18} />}
          register={register('name')}
          error={errors.name?.message}
        />

        <FormInput
          label="Alamat Email"
          id="email"
          type="email"
          placeholder="john@example.com"
          icon={<Mail size={18} />}
          register={register('email')}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Kata Sandi"
          id="password"
          type="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          register={register('password')}
          error={errors.password?.message}
        />

        <FormInput
          label="Konfirmasi Kata Sandi"
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          register={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>

      <FormInput
        label="Nomor Telepon"
        id="phone"
        placeholder="081234567890"
        icon={<Phone size={18} />}
        register={register('phone')}
        error={errors.phone?.message}
      />

      {/* Store Info Section Header */}
      <div className="border-b border-slate-100 pt-2 pb-2">
        <h3 className="text-sm font-bold text-primary">Informasi Toko / Produsen</h3>
      </div>

      <FormInput
        label="Nama Toko"
        id="businessName"
        placeholder="Tani Makmur Jaya"
        icon={<Store size={18} />}
        register={register('businessName')}
        error={errors.businessName?.message}
      />

      <TextAreaInput
        label="Alamat Lengkap Toko"
        id="businessAddress"
        placeholder="Jalan Tani No. 5, Kel. Tunas, Kec. Raya"
        register={register('businessAddress')}
        error={errors.businessAddress?.message}
      />

      {/* Banking Info Section Header */}
      <div className="border-b border-slate-100 pt-2 pb-2">
        <h3 className="text-sm font-bold text-primary">Rekening Pembayaran</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Nama Bank"
          id="bankName"
          placeholder="Bank Central Asia (BCA)"
          icon={<Landmark size={18} />}
          register={register('bankName')}
          error={errors.bankName?.message}
        />

        <FormInput
          label="Nomor Rekening"
          id="bankAccount"
          placeholder="1234567890"
          icon={<CreditCard size={18} />}
          register={register('bankAccount')}
          error={errors.bankAccount?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-secondary/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none bg-primary hover:bg-primary-hover text-white py-3 text-sm shadow-lg shadow-primary/20 cursor-pointer mt-6"
      >
        {isLoading ? 'Memproses Pendaftaran...' : 'Daftar Sebagai Seller'}
      </button>
    </form>
  );
};

export default SellerRegisterForm;
