export interface UserResponse {
  name?: Name;
  address?: Address;
  _id?: string;
  email?: string;
  username?: string;
  password?: string;
  phone?: string;
}

interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Geolocation {
  lat: string;
  long: string;
}

interface Name {
  firstname: string;
  lastname: string;
}
