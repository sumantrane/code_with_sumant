export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface Products {
  products: Product[];
}
