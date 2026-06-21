import axios from 'axios';
import type { Product, ShippingOption, Address, PaymentOption } from '../../types/buyer';
import type { Order, CreateOrderRequest, CreateOrderResponse } from '../../types/buyer/order';
import type { SearchProductsParams, GetShippingCostResponse } from '../../types/buyer/api';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const buyerService = {
  searchProducts: async (params?: SearchProductsParams): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products', { params });
    return response.data;
  },

  getProduct: async (slug: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${slug}`);
    return response.data;
  },

  getShippingOptions: async (): Promise<ShippingOption[]> => {
    const response = await api.get<ShippingOption[]>('/shipping');
    return response.data;
  },

  getDefaultAddress: async (): Promise<Address> => {
    const response = await api.get<Address>('/address/default');
    return response.data;
  },

  getPaymentOptions: async (): Promise<PaymentOption[]> => {
    const response = await api.get<PaymentOption[]>('/payments');
    return response.data;
  },

  getOrders: async (status?: string): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders', { params: { status } });
    return response.data;
  },

  getOrderHistory: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders/history');
    return response.data;
  },

  getShippingCost: async (id: string): Promise<GetShippingCostResponse> => {
    const response = await api.get<GetShippingCostResponse>(`/shipping/${id}/cost`);
    return response.data;
  },

  createOrder: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const response = await api.post<CreateOrderResponse>('/orders', data);
    return response.data;
  },
};

export default buyerService;
