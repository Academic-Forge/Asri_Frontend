import type { Product, ShippingOption, Address, PaymentOption } from '../../types/buyer';
import type { Order, CreateOrderRequest, CreateOrderResponse } from '../../types/buyer/order';
import type { SearchProductsParams, GetShippingCostResponse } from '../../types/buyer/api';
import { mockProducts } from '../../mocks/buyer/products';
import { mockOrders, mockHistory } from '../../mocks/buyer/orders';
import { mockAddress, mockShipping } from '../../mocks/buyer/shipping';
import { mockPayments } from '../../mocks/buyer/payments';

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const buyerMockService = {
  searchProducts: async (params?: SearchProductsParams): Promise<Product[]> => {
    await delay();
    let result = [...mockProducts];
    if (params?.q) {
      const q = params.q.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.storeName.toLowerCase().includes(q),
      );
    }
    if (params?.category) {
      result = result.filter((p) => p.category === params.category);
    }
    if (params?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= params.minPrice!);
    }
    if (params?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= params.maxPrice!);
    }
    return result;
  },

  getProduct: async (slug: string): Promise<Product> => {
    await delay();
    const product = mockProducts.find((p) => p.slug === slug);
    if (!product) throw new Error('Produk tidak ditemukan');
    return product;
  },

  getShippingOptions: async (): Promise<ShippingOption[]> => {
    await delay();
    return mockShipping;
  },

  getDefaultAddress: async (): Promise<Address> => {
    await delay();
    return mockAddress;
  },

  getPaymentOptions: async (): Promise<PaymentOption[]> => {
    await delay();
    return mockPayments;
  },

  getOrders: async (status?: string): Promise<Order[]> => {
    await delay();
    if (!status || status === 'semua') return mockOrders;
    return mockOrders.filter((o) => o.status === status);
  },

  getOrderHistory: async (): Promise<Order[]> => {
    await delay();
    return mockHistory;
  },

  getShippingCost: async (id: string): Promise<GetShippingCostResponse> => {
    await delay();
    const found = mockShipping.find((s) => s.id === id);
    return found ? { name: found.name, cost: found.cost } : { name: '-', cost: 0 };
  },

  createOrder: async (_data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    await delay(500);
    return { orderId: `INV-${String(Date.now()).slice(-6)}` };
  },
};
