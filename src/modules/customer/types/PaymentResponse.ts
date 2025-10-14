export type PaymentResponse = {
  id: string;
  customerId: string;
  orderDate: Date;
  status: string;
  totalAmount: number;
  currency: string;
};
