export interface Product {
  _id: number;
  p_id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
  hasDiscount?: boolean;
  discount?: number;
}

export interface Products {
  products: Product[];
}
