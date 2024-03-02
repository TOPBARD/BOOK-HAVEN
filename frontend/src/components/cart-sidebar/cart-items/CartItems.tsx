import React from "react";
import { FaMinus, FaPlus, FaX } from "react-icons/fa6";
import { CartItem } from "../../../shared/interface/CartItem";
import { useCart } from "../../../shared/context/CartProvider";

/**
 * CartItems Component
 * Displays individual items in the shopping cart.
 * @param {Object} props - Component props
 * @param {CartItem} props.item - Cart item details
 * @returns {JSX.Element} - CartItems JSX element
 */
const CartItems: React.FC<{ item: CartItem }> = ({ item }) => {
  // Accessing cart context methods
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="flex w-full justify-between mb-4 items-center h-[120px] border-b">
      {/* Book Image */}
      <div className="w-[110px] h-[110px] relative">
        <img
          src={item?.bookImageUrl}
          alt="Book Image"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Name, Price, Quantity, Remove Button */}
      <div className="w-full max-w-[180px] flex flex-col justify-center gap-4">
        <div className="flex items-center justify-between">
          <h5 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm mr-2">
            {item?.bookTitle}
          </h5>
          <button onClick={() => removeFromCart(item?._id)}>
            <FaX className="text-sm" />
          </button>
        </div>

        {/* Increment, Decrement, Item Price */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {/* Decrease Quantity Button */}
            <button onClick={() => decreaseQuantity(item?._id)}>
              <FaMinus className="text-sm" />
            </button>
            {/* Quantity Display */}
            <div className="font-semibold">{item?.quantityInCart}</div>
            {/* Increase Quantity Button */}
            <button onClick={() => increaseQuantity(item?._id)}>
              <FaPlus className="text-sm" />
            </button>
          </div>
          {/* Item Price */}
          <div className="font-semibold text-balance text-right">
            {`Rs. ${item?.bookDetails?.bookPrice * item?.quantityInCart}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
