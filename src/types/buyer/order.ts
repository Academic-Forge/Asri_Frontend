export interface Order {
  id: string;
  storeName: string;
  productName: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

export interface CreateOrderRequest {
  items: { productId: string; quantity: number }[];
  shippingId: string;
  addressId: string;
  paymentId: string;
}

export interface CreateOrderResponse {
  orderId: string;
}
