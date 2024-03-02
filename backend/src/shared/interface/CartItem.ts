import { Book } from './Books';

export interface CartItem extends Book {
  quantityInCart: number;
}
