export interface MockOrder {
  id: string;
  storeName: string;
  date: string;
  total: number;
  status: string;
  items: number;
  productName: string;
}

export const mockOrders: MockOrder[] = [
  { id: 'INV-004', storeName: 'Toko Alat Tulis', date: '20 Jun 2026', total: 25000, status: 'belum-dibayar', items: 1, productName: 'Buku Catatan Premium' },
  { id: 'INV-005', storeName: 'Fashion Store', date: '19 Jun 2026', total: 58000, status: 'dikemas', items: 2, productName: 'Tas Ransel Anti Air' },
  { id: 'INV-006', storeName: 'Kafe Nusantara', date: '18 Jun 2026', total: 120000, status: 'dikirim', items: 1, productName: 'Kopi Arabika Premium' },
  { id: 'INV-007', storeName: 'Toko Alat Tulis', date: '15 Jun 2026', total: 35000, status: 'selesai', items: 2, productName: 'Pensil Warna' },
  { id: 'INV-008', storeName: 'Fashion Store', date: '10 Jun 2026', total: 75000, status: 'dibatalkan', items: 1, productName: 'Topi Baseball' },
  { id: 'INV-009', storeName: 'Kafe Nusantara', date: '08 Jun 2026', total: 45000, status: 'penilaian', items: 1, productName: 'Green Tea Latte' },
];

export const mockHistory: MockOrder[] = [
  { id: 'INV-001', storeName: 'Toko Alat Tulis', productName: 'Buku Catatan Premium', date: '15 Jun 2026', total: 35000, status: 'Selesai', items: 2 },
  { id: 'INV-002', storeName: 'Fashion Store', productName: 'Tas Ransel Anti Air', date: '10 Jun 2026', total: 150000, status: 'Selesai', items: 1 },
  { id: 'INV-003', storeName: 'Kafe Nusantara', productName: 'Kopi Arabika Premium', date: '28 Mei 2026', total: 45000, status: 'Dikirim', items: 3 },
  { id: 'INV-010', storeName: 'Toko Alat Tulis', productName: 'Spidol Warna', date: '20 Mei 2026', total: 18000, status: 'Selesai', items: 1 },
];
