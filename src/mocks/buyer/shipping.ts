import type { Address, ShippingOption } from '../../types/buyer';

export const mockAddress: Address = {
  id: '1',
  label: 'Rumah',
  recipient: 'Budi Santoso',
  phone: '081234567890',
  fullAddress: 'Jl. Merdeka No. 123, Kelurahan Sukamaju, Kecamatan Cimahi, Kota Bandung, Jawa Barat 40512',
  isMain: true,
};

export const mockShipping: ShippingOption[] = [
  { id: 'asri-reg', name: 'ASRI REGULER', service: 'Reguler', cost: 8000, estimatedDays: '4-5 Hari' },
  { id: 'asri-exp', name: 'ASRI EXPRESS', service: 'Express', cost: 15000, estimatedDays: '1-2 Hari' },
];
