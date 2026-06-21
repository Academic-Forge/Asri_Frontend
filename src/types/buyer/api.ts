export interface SearchProductsParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface GetShippingCostResponse {
  name: string;
  cost: number;
}
