export type address = {
  id: string;
  customerId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postcode: string;
  countryCode: string;
  countryName: string;
};
