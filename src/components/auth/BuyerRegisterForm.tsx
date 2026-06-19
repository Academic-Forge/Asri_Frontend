import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Phone, Briefcase } from 'lucide-react';
import { buyerRegisterSchema } from '../../schemas/authSchema';
import type { BuyerRegisterInput } from '../../schemas/authSchema';
import { FormInput } from '../ui/FormInput';
import { TextAreaInput } from '../ui/TextAreaInput';
import { FileUpload } from '../ui/FileUpload';

interface BuyerRegisterFormProps {
  onSubmit: (data: BuyerRegisterInput) => void;
  isLoading: boolean;
}

export const BuyerRegisterForm: React.FC<BuyerRegisterFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BuyerRegisterInput>({
    resolver: zodResolver(buyerRegisterSchema),
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

      {/* Business Info Section Header */}
      <div className="border-b border-slate-100 pt-2 pb-2">
        <h3 className="text-sm font-bold text-primary">Informasi Bisnis & Usaha</h3>
      </div>

      <FormInput
        label="Nama Toko / Usaha"
        id="businessName"
        placeholder="Toko Kelontong Makmur"
        icon={<Briefcase size={18} />}
        register={register('businessName')}
        error={errors.businessName?.message}
      />

      <TextAreaInput
        label="Alamat Lengkap Usaha"
        id="address"
        placeholder="Jalan Merdeka No. 12, Kel. Sumber, Kec. Jaya"
        register={register('address')}
        error={errors.address?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="siup"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="Surat Izin Usaha (SIUP / NIB)"
              id="siup"
              accept=".pdf,image/*"
              onChange={field.onChange}
              value={field.value}
              error={errors.siup?.message as string}
            />
          )}
        />

        <Controller
          name="businessPhoto"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="Foto Tempat Usaha"
              id="businessPhoto"
              accept="image/*"
              onChange={field.onChange}
              value={field.value}
              error={errors.businessPhoto?.message as string}
            />
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-secondary/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none bg-primary hover:bg-primary-hover text-white py-3 text-sm shadow-lg shadow-primary/20 cursor-pointer mt-6"
      >
        {isLoading ? 'Memproses Pendaftaran...' : 'Daftar Sebagai Buyer'}
      </button>
    </form>
  );
};

export default BuyerRegisterForm;
