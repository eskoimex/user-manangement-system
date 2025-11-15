export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  addresses?: Address[];
}

export interface Address {
  id: number;
  user_id: number;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}