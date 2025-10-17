export type Order = {
  id: string;
  customerId: string;
  orderDate: string; // ISO date string
  status: string;
  totalAmount: number;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};
