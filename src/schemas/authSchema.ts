import { z } from 'zod';

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
 * Zod schema for validating Register form input.
 * Includes refine logic to verify password and confirmPassword match.
 */
export const registerSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok dengan password',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
