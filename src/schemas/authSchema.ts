import { z } from 'zod';

/**
 * Common regex / rules
 */
const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;

/**
 * File validation helper
 */
const requiredFileSchema = z.any().refine((file) => {
  if (!file) return false;
  if (file instanceof File) return true;
  if (file instanceof FileList && file.length > 0) return true;
  return typeof file === 'object' && file !== null;
}, { message: 'File wajib diunggah' });

/**
 * Zod schema for validating Login form input.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(8, { message: 'Password minimal terdiri dari 8 karakter' }),
});

/**
 * Reusable base register fields schema
 */
const baseRegisterFields = {
  name: z
    .string()
    .min(2, { message: 'Nama minimal terdiri dari 2 karakter' }),
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(8, { message: 'Password minimal terdiri dari 8 karakter' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Konfirmasi password wajib diisi' }),
  phone: z
    .string()
    .min(1, { message: 'Nomor telepon wajib diisi' })
    .regex(phoneRegex, { message: 'Format nomor telepon Indonesia tidak valid' }),
};

/**
 * 1. Buyer Registration Schema
 */
export const buyerRegisterSchema = z
  .object({
    ...baseRegisterFields,
    businessName: z.string().min(2, { message: 'Nama toko/usaha minimal 2 karakter' }),
    address: z.string().min(10, { message: 'Alamat lengkap usaha minimal 10 karakter' }),
    siup: requiredFileSchema,
    businessPhoto: requiredFileSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok dengan password',
    path: ['confirmPassword'],
  });

/**
 * 2. Seller Registration Schema
 */
export const sellerRegisterSchema = z
  .object({
    ...baseRegisterFields,
    businessName: z.string().min(2, { message: 'Nama toko minimal 2 karakter' }),
    businessAddress: z.string().min(10, { message: 'Alamat toko minimal 10 karakter' }),
    bankName: z.string().min(2, { message: 'Nama bank wajib diisi' }),
    bankAccount: z.string().min(5, { message: 'Nomor rekening minimal 5 digit' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok dengan password',
    path: ['confirmPassword'],
  });

/**
 * 3. Driver Registration Schema
 */
export const driverRegisterSchema = z
  .object({
    ...baseRegisterFields,
    vehicleNumber: z.string().min(4, { message: 'Nomor kendaraan (pelat) wajib diisi' }),
    ktp: requiredFileSchema,
    sim: requiredFileSchema,
    stnk: requiredFileSchema,
    bpkb: requiredFileSchema,
    selfie: requiredFileSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok dengan password',
    path: ['confirmPassword'],
  });

/**
 * 4. Validator Registration Schema
 */
export const validatorRegisterSchema = z
  .object({
    ...baseRegisterFields,
    validatorCode: z.string().min(4, { message: 'Kode sertifikasi / ID Validator wajib diisi' }),
    ktp: requiredFileSchema,
    selfie: requiredFileSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok dengan password',
    path: ['confirmPassword'],
  });

/**
 * Legacy schema (preserved to maintain backward compatibility if used elsewhere)
 */
export const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Nama minimal terdiri dari 2 karakter' }),
    email: z.string().min(1, { message: 'Email wajib diisi' }).email({ message: 'Format email tidak valid' }),
    password: z.string().min(8, { message: 'Password minimal terdiri dari 8 karakter' }),
    confirmPassword: z.string().min(1, { message: 'Konfirmasi password wajib diisi' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok dengan password',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type BuyerRegisterInput = z.infer<typeof buyerRegisterSchema>;
export type SellerRegisterInput = z.infer<typeof sellerRegisterSchema>;
export type DriverRegisterInput = z.infer<typeof driverRegisterSchema>;
export type ValidatorRegisterInput = z.infer<typeof validatorRegisterSchema>;
