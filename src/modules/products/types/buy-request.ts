import type { Product } from "./product";

export type BuyRequest = {
  customerId?: string;
  firstName: string;
  lastName: string;
  email: string;
  currency: string;
  shippingAddress: ShippingAddress;
  items: OrderRequestItem[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  unitPrice: number;
};

export type ShippingAddress = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
};

export type OrderRequestItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
};
