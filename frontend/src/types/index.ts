export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
