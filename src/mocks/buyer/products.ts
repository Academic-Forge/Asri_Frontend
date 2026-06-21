import type { Product } from '../../types/buyer';

export const mockProducts: Product[] = [
  {
    id: '1', name: 'Buku Catatan Premium', slug: 'buku-catatan-premium', price: 25000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Buku', category: 'Alat Tulis',
    rating: 4.8, sold: 120, stock: 50,
    description: 'Buku catatan premium dengan kertas berkualitas tinggi.', storeName: 'Toko Alat Tulis',
  },
  {
    id: '2', name: 'Tas Ransel Anti Air', slug: 'tas-ransel-anti-air', price: 150000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Tas', category: 'Fashion',
    rating: 4.5, sold: 89, stock: 30,
    description: 'Tas ransel anti air dengan banyak kompartemen.', storeName: 'Fashion Store',
  },
  {
    id: '3', name: 'Kopi Arabika Premium', slug: 'kopi-arabika-premium', price: 45000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Kopi', category: 'Makanan',
    rating: 4.9, sold: 250, stock: 100,
    description: 'Kopi arabika asli dari dataran tinggi.', storeName: 'Kafe Nusantara',
  },
  {
    id: '4', name: 'Pensil Mekanik 0.5mm', slug: 'pensil-mekanik-05mm', price: 12000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Pensil', category: 'Alat Tulis',
    rating: 4.6, sold: 200, stock: 80,
    description: 'Pensil mekanik dengan ujung 0.5mm yang presisi.', storeName: 'Toko Alat Tulis',
  },
  {
    id: '5', name: 'Jam Tangan Digital', slug: 'jam-tangan-digital', price: 85000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Jam', category: 'Fashion',
    rating: 4.3, sold: 65, stock: 25,
    description: 'Jam tangan digital dengan fitur tahan air.', storeName: 'Fashion Store',
  },
  {
    id: '6', name: 'Teh Hijau Premium', slug: 'teh-hijau-premium', price: 28000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Teh', category: 'Makanan',
    rating: 4.7, sold: 180, stock: 90,
    description: 'Teh hijau premium dengan antioksidan tinggi.', storeName: 'Kafe Nusantara',
  },
  {
    id: '7', name: 'Headphone Bluetooth', slug: 'headphone-bluetooth', price: 200000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=HP', category: 'Elektronik',
    rating: 4.4, sold: 45, stock: 20,
    description: 'Headphone bluetooth dengan suara jernih.', storeName: 'Gadget Zone',
  },
  {
    id: '8', name: 'Casing HP Silikon', slug: 'casing-hp-silikon', price: 15000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Casing', category: 'Elektronik',
    rating: 4.2, sold: 310, stock: 200,
    description: 'Casing HP silikon anti gores dan anti slip.', storeName: 'Gadget Zone',
  },
  {
    id: '9', name: 'Vitamin C 1000mg', slug: 'vitamin-c-1000mg', price: 35000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Vitamin', category: 'Kesehatan',
    rating: 4.9, sold: 420, stock: 150,
    description: 'Suplemen vitamin C 1000mg untuk imunitas tubuh.', storeName: 'Sehat Bersama',
  },
  {
    id: '10', name: 'Masker KF94 (50pcs)', slug: 'masker-kf94', price: 55000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Masker', category: 'Kesehatan',
    rating: 4.6, sold: 550, stock: 300,
    description: 'Masker KF94 4 lapis, nyaman dan protektif.', storeName: 'Sehat Bersama',
  },
  {
    id: '11', name: 'Sprei Katun Premium', slug: 'sprei-katun-premium', price: 95000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Sprei', category: 'Fashion',
    rating: 4.5, sold: 78, stock: 40,
    description: 'Sprei katun premium dengan motif elegan.', storeName: 'Fashion Store',
  },
  {
    id: '12', name: 'Botol Minum Stainless', slug: 'botol-minum-stainless', price: 65000,
    image: 'https://placehold.co/400x400/e2e8f0/64748b?text=Botol', category: 'Alat Tulis',
    rating: 4.7, sold: 160, stock: 70,
    description: 'Botol minum stainless 500ml, tahan panas dan dingin.', storeName: 'Toko Alat Tulis',
  },
];

export const mockProductDetail: Product = mockProducts[0];
