import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../assets/shadcn-ui/components/sheet";
import { ScrollArea } from "../../assets/shadcn-ui/components/scroll-area";
import CartItems from "./cart-items/CartItems";
import CheckoutBtn from "../hover-buttons/checkout-btn/CheckoutBtn";
import { useCart } from "../../shared/context/CartProvider";
import { useAuth } from "../../shared/context/AuthProvider";

/**
 * CartSidebar Component
 * Displays the user's shopping cart in a sidebar.
 * @returns {JSX.Element} - CartSidebar JSX element
 */
const CartSidebar: React.FC = () => {
  // Extracting cart information using context hooks
  const {
    totalCartQuantity,
    cart,
    totalPrice,
    shouldDisplayCart,
    handleCartDisplay,
  } = useCart();

  // Login Status for checking user authentication status
  const { isLoggedIn } = useAuth();

  return (
    <Sheet
      open={shouldDisplayCart}
      onOpenChange={() => handleCartDisplay(isLoggedIn)}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left mb-12">
            My Shopping Cart({totalCartQuantity ?? 0})
          </SheetTitle>
        </SheetHeader>
        <>
          {totalCartQuantity === 0 ? (
            //Display Message when Cart is empty
            <div className="flex flex-col items-center justify-center w-full h-[760px]">
              <h5 className="text-black/50">Your Cart is empty</h5>
            </div>
          ) : (
            // Display the list of items in the cart
            <ScrollArea className="h-[65vh] xl:h-[70vh] pr-4 mb-4">
              {totalCartQuantity > 0 &&
                cart.map((item) => {
                  return <CartItems item={item} key={item?._id} />;
                })}
            </ScrollArea>
          )}
        </>
        {totalCartQuantity > 0 && (
          // Display total price and checkout button when there are items in the cart
          <div>
            <div className="flex justify-between font-semibold">
              <div className="uppercase mb-5">Total</div>
              <div>Rs. {totalPrice}</div>
            </div>
            <CheckoutBtn cart={cart} totalCartQuantity={totalCartQuantity} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
