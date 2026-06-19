// src/schemas/authSchema.ts
import { z } from 'zod';

// ─── Login Schema ───────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Register Schema ────────────────────────────────────────────────────────
// Validasi dasar untuk semua user
const baseRegisterSchema = z.object({
  name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const registerSchema = z.discriminatedUnion('role', [
  // 1. Role Buyer
  baseRegisterSchema.extend({
    role: z.literal('buyer'),
    phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
    address: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
  }),

  // 2. Role Seller
  baseRegisterSchema.extend({
    role: z.literal('seller'),
    business_name: z.string().min(3, 'Nama toko/bisnis minimal 3 karakter'),
    business_address: z.string().min(10, 'Alamat toko/bisnis minimal 10 karakter'),
  }),

  // 3. Role Driver
  baseRegisterSchema.extend({
    role: z.literal('driver'),
    phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
    vehicle_number: z.string().min(4, 'Nomor kendaraan/plat nomor tidak valid'),
  }),

  // 4. Role Validator (Jika di UI image_2c89c8.jpg dipilih, sementara pakai data dasar)
  baseRegisterSchema.extend({
    role: z.literal('validator'),
  }),
  
  // 5. Role Admin
  baseRegisterSchema.extend({
    role: z.literal('admin'),
  }),
]);

// Extract type untuk digunakan di useForm<RegisterInput>
export type RegisterInput = z.infer<typeof registerSchema>;