export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  sold: number;
  stock: number;
  description: string;
  storeName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  service: string;
  cost: number;
  estimatedDays: string;
}

export interface Address {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  fullAddress: string;
  isMain: boolean;
}

export interface PaymentOption {
  id: string;
  name: string;
  type: 'bank_transfer' | 'e_wallet' | 'cod';
  description: string;
  icon: string;
}
