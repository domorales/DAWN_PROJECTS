import { ProductResponse } from './Product';

interface CartResponse {
  _id: string;
  userId: string;
  date: Date;
  products: ProductsCart[];
}

interface ProductsCart {
  productId: string | ProductResponse;
  quantity: number;
}

export { CartResponse, ProductsCart };
