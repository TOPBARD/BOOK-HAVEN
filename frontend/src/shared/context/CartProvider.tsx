import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Book } from "../interface/Books";
import { CartItem } from "../interface/CartItem";
import { CartContextProps } from "../interface/CartContextProps";
import toast from "react-hot-toast";

// Create the CartContext with initial value undefined
export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

// CartProvider is a component that wraps its children with CartContext.Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Function to get local cart data from localStorage
  const getLocalCartData = () => {
    const cartData = localStorage.getItem("CartItems");
    return cartData ? JSON.parse(cartData) : [];
  };

  // State variables for cart, total cart quantity, total price, and cart display
  const [cart, setCart] = useState<CartItem[]>(getLocalCartData());
  const [totalCartQuantity, setTotalCartQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shouldDisplayCart, setShouldDisplayCart] = useState<boolean>(false);

  // Function to handle cart display based on login status
  const handleCartDisplay = (isLoggedIn: boolean) => {
    if (isLoggedIn) {
      setShouldDisplayCart(!shouldDisplayCart);
    } else {
      toast.error("Please Login To View Cart");
    }
  };

  // Function to add a book to the cart
  const addToCart = (book: Book, id: string) => {
    const newItem = { ...book, quantityInCart: 1 };
    const cartItem = cart.find((item) => item?._id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item?._id === id) {
          return { ...item, quantityInCart: item?.quantityInCart + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item?._id !== id);
    setCart(newCart);
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (id: string) => {
    const cartItem = cart.find((item) => item?._id === id);
    if (cartItem) {
      addToCart(cartItem, id);
    }
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (id: string) => {
    const cartItem = cart.find((item) => item?._id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item?._id === id) {
          return { ...item, quantityInCart: item?.quantityInCart - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem && cartItem?.quantityInCart < 2) {
      removeFromCart(id);
    }
  };

  // Save cart data to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("CartItems", JSON.stringify(cart));
  }, [cart]);

  // Calculate total cart quantity whenever the cart changes
  useEffect(() => {
    if (cart) {
      const totalQuantity = cart.reduce(
        (acc, item) => acc + item?.quantityInCart,
        0
      );
      setTotalCartQuantity(totalQuantity);
    }
  }, [cart]);

  // Calculate total price whenever the cart changes
  useEffect(() => {
    if (cart) {
      const total = cart.reduce(
        (acc, item) =>
          acc + item?.quantityInCart * item?.bookDetails?.bookPrice,
        0
      );
      setTotalPrice(total);
    }
  }, [cart]);

  // Provide the context values to the CartContext.Provider
  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        setCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        handleCartDisplay,
        shouldDisplayCart,
        totalCartQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
