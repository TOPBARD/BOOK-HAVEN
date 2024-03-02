import React, { ReactElement } from "react";
import { IconBaseProps } from "react-icons";
import toast from "react-hot-toast";
import { Book } from "../../../shared/interface/Books";
import { useCart } from "../../../shared/context/CartProvider";

// Define the prop types for the AddToCart component
interface AddToCartProps {
  btnStyles: string;
  book: Book;
  id: string;
  icon?: ReactElement<IconBaseProps>;
  name?: string;
}

/**
 * AddToCart component allows users to add a book to the cart.
 *
 * @param {AddToCartProps} props - The component properties.
 * @returns {React.ReactElement} - The rendered component.
 */
export default function AddToCart({
  btnStyles,
  icon,
  name,
  book,
  id,
}: AddToCartProps): React.ReactElement {
  // Access the addToCart function from the CartProvider context
  const { addToCart } = useCart();

  /**
   * Handles the click event when the user adds a book to the cart.
   */
  const handleAddToCart = (): void => {
    // Call the addToCart function with the provided book and id
    addToCart(book, id);

    // Display a success toast notification
    toast.success("Item added to cart", {
      position: "top-center",
      duration: 3000,
      icon: "✅",
    });
  };

  return (
    // Render a button with the specified styles and click event handler
    <button className={`${btnStyles}`} onClick={handleAddToCart}>
      {/* Display the optional name */}
      <div>{name}</div>
      {/* Display the optional icon */}
      <div>{icon}</div>
    </button>
  );
}
