import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Phone, Shield } from 'lucide-react';
import { validatorRegisterSchema } from '../../schemas/authSchema';
import type { ValidatorRegisterInput } from '../../schemas/authSchema';
import { FormInput } from '../ui/FormInput';
import { FileUpload } from '../ui/FileUpload';

interface ValidatorRegisterFormProps {
  onSubmit: (data: ValidatorRegisterInput) => void;
  isLoading: boolean;
}

export const ValidatorRegisterForm: React.FC<ValidatorRegisterFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ValidatorRegisterInput>({
    resolver: zodResolver(validatorRegisterSchema),
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
          label="ID / Kode Sertifikasi Validator"
          id="validatorCode"
          placeholder="VAL-12345"
          icon={<Shield size={18} />}
          register={register('validatorCode')}
          error={errors.validatorCode?.message}
        />
      </div>

      {/* Verification Docs Section Header */}
      <div className="border-b border-slate-100 pt-2 pb-2">
        <h3 className="text-sm font-bold text-primary">Dokumen Verifikasi Identitas</h3>
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-secondary/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none bg-primary hover:bg-primary-hover text-white py-3 text-sm shadow-lg shadow-primary/20 cursor-pointer mt-6"
      >
        {isLoading ? 'Memproses Pendaftaran...' : 'Daftar Sebagai Validator'}
      </button>
    </form>
  );
};

export default ValidatorRegisterForm;
