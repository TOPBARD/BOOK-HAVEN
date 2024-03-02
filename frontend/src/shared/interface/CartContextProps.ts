import { Dispatch, SetStateAction } from "react";
import { Book } from "./Books";
import { CartItem } from "./CartItem";

export interface CartContextProps {
  addToCart: (book: Book, id: string) => void;
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  handleCartDisplay: (isLoggedIn: boolean) => void;
  totalCartQuantity: number;
  totalPrice: number;
  shouldDisplayCart: boolean;
}
