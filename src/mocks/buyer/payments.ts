import type { PaymentOption } from '../../types/buyer';

export const mockPayments: PaymentOption[] = [
  { id: 'bca', name: 'Bank BCA', type: 'bank_transfer', description: 'Transfer Virtual Account', icon: '' },
  { id: 'mandiri', name: 'Bank Mandiri', type: 'bank_transfer', description: 'Transfer Virtual Account', icon: '' },
  { id: 'bni', name: 'Bank BNI', type: 'bank_transfer', description: 'Transfer Virtual Account', icon: '' },
  { id: 'bri', name: 'Bank BRI', type: 'bank_transfer', description: 'Transfer Virtual Account', icon: '' },
  { id: 'gopay', name: 'GoPay', type: 'e_wallet', description: 'E-Wallet', icon: '' },
  { id: 'ovo', name: 'OVO', type: 'e_wallet', description: 'E-Wallet', icon: '' },
  { id: 'dana', name: 'DANA', type: 'e_wallet', description: 'E-Wallet', icon: '' },
  { id: 'cod', name: 'Bayar di Tempat (COD)', type: 'cod', description: 'Bayar saat barang diterima', icon: '' },
];

export const mockShippingMap: Record<string, { name: string; cost: number }> = {
  'asri-reg': { name: 'ASRI REGULER', cost: 8000 },
  'asri-exp': { name: 'ASRI EXPRESS', cost: 15000 },
};
