import type { Product } from "./product";

export type BuyRequest = {
  customerId?: string;
  firstName: string;
  lastName: string;
  email: string;
  currency: string;
  shippingAddress: Address;
  items: CartItem[];
};

export type Address = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  unitPrice: number;
};
