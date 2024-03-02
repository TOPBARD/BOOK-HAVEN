import axios from "axios";
import { CartItem } from "../../../shared/interface/CartItem";
import { loadStripe, Stripe } from "@stripe/stripe-js";

/**
 * CheckoutBtn component provides a button for users to proceed to checkout.
 *
 * @param {Object} props - The component properties.
 * @param {CartItem[]} props.cart - The array of cart items.
 * @param {number} props.totalCartQuantity - The total quantity of items in the cart.
 * @returns {React.ReactElement} - The rendered component.
 */
export default function CheckoutBtn({
  cart,
  totalCartQuantity,
}: {
  cart: CartItem[];
  totalCartQuantity: number;
}): React.ReactElement {
  /**
   * Handles the click event when the user initiates the checkout process.
   */
  const cartCheckout = async (): Promise<void> => {
    // Load Stripe and get the Stripe public key from the environment variables
    const stripe: Stripe | null = await loadStripe(
      process.env.STRIPE_PUBLIC_KEY || ""
    );

    // Prepare the cart object to be sent to the server
    const cartObj = {
      cart,
      totalCartQuantity,
    };

    // If the cart is empty, return and do not proceed to checkout
    if (totalCartQuantity === 0) {
      return;
    }

    try {
      // Send a POST request to the server to create a checkout session
      const response = await axios.post(
        "http://localhost:5000/orders/checkout",
        cartObj
      );

      // Redirect the user to the Stripe Checkout page using the session ID
      stripe?.redirectToCheckout({
        sessionId: response.data.sessionId,
      });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    // Render a button with the click event handler and appropriate styling
    <button onClick={cartCheckout} className="btn btn-primary w-full">
      Proceed to checkout
    </button>
  );
}
