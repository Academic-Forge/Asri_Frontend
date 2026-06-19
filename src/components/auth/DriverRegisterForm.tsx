import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Phone, Truck } from 'lucide-react';
import { driverRegisterSchema } from '../../schemas/authSchema';
import type { DriverRegisterInput } from '../../schemas/authSchema';
import { FormInput } from '../ui/FormInput';
import { FileUpload } from '../ui/FileUpload';

interface DriverRegisterFormProps {
  onSubmit: (data: DriverRegisterInput) => void;
  isLoading: boolean;
}

export const DriverRegisterForm: React.FC<DriverRegisterFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DriverRegisterInput>({
    resolver: zodResolver(driverRegisterSchema),
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Nomor Telepon"
          id="phone"
          placeholder="081234567890"
          icon={<Phone size={18} />}
          register={register('phone')}
          error={errors.phone?.message}
        />

        <FormInput
          label="Nomor Plat Kendaraan"
          id="vehicleNumber"
          placeholder="B 1234 ABC"
          icon={<Truck size={18} />}
          register={register('vehicleNumber')}
          error={errors.vehicleNumber?.message}
        />
      </div>

      {/* Verification Docs Section Header */}
      <div className="border-b border-slate-100 pt-2 pb-2">
        <h3 className="text-sm font-bold text-primary">Dokumen Verifikasi Kendaraan & Identitas</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="selfie"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="Foto Selfie dengan KTP"
              id="selfie"
              accept="image/*"
              onChange={field.onChange}
              value={field.value}
              error={errors.selfie?.message as string}
            />
          )}
        />

        <Controller
          name="ktp"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="Foto KTP"
              id="ktp"
              accept="image/*"
              onChange={field.onChange}
              value={field.value}
              error={errors.ktp?.message as string}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Controller
          name="sim"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="Foto SIM"
              id="sim"
              accept="image/*"
              onChange={field.onChange}
              value={field.value}
              error={errors.sim?.message as string}
            />
          )}
        />

        <Controller
          name="stnk"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="Foto STNK"
              id="stnk"
              accept="image/*"
              onChange={field.onChange}
              value={field.value}
              error={errors.stnk?.message as string}
            />
          )}
        />

        <Controller
          name="bpkb"
          control={control}
          render={({ field }) => (
            <FileUpload
              label="Foto BPKB (Opsional / Jika ada)"
              id="bpkb"
              accept="image/*"
              onChange={field.onChange}
              value={field.value}
              error={errors.bpkb?.message as string}
            />
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-secondary/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none bg-primary hover:bg-primary-hover text-white py-3 text-sm shadow-lg shadow-primary/20 cursor-pointer mt-6"
      >
        {isLoading ? 'Memproses Pendaftaran...' : 'Daftar Sebagai Driver'}
      </button>
    </form>
  );
};

export default DriverRegisterForm;
