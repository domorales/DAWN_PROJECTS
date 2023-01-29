export interface Customer {
  id: number;
  customerName: string;
  contactLastName: string;
  contactFirstName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  creditLimit: number;
  salesRepEmployeeNumber?: number;
}
