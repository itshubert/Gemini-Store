import type { Address } from "./Address";

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
};
