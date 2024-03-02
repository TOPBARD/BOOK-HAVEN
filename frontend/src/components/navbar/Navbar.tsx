import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import CartSidebar from "../cart-sidebar/CartSidebar";
import { useCart } from "../../shared/context/CartProvider";
import { useAuth } from "../../shared/context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { NavItem } from "../../shared/interface/NavItems";

const navData: NavItem[] = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Store", path: "/store" },
  { id: 3, name: "Contact", path: "/contact-us" },
];

/**
 * Navbar component represents the navigation bar of the application.
 * It includes the logo, navigation links, login button, user dropdown, and cart icon.
 * @returns {JSX.Element} The Navbar component.
 */
const Navbar: React.FC = () => {
  // Access cart context to get total cart quantity and handle cart display
  const { totalCartQuantity, handleCartDisplay } = useCart();

  // Access auth context to check user authentication status and perform user-related actions
  const { isLoggedIn, signOutUser, user } = useAuth();

  console.log("User data on nav =", user);

  // State to manage the visibility of the user dropdown
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 py-4 z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="hover:text-current text-lg lg:text-2xl xl:text-3xl"
        >
          <h1 className="text-[26px]">
            <span className="text-accent">B</span>ook-
            <span className="text-accent">H</span>aven
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-[26px]">
          <div className="hidden lg:flex gap-[36px]">
            {navData.map((data) => (
              <Link to={data.path} key={data.id}>
                {data.name}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          {!isLoggedIn && (
            <Link to="/login">
              <button className="mx-auto ml-2 p-[11px] font-semibold rounded-xl text-white bg-accent">
                Login
              </button>
            </Link>
          )}

          {/* User Dropdown */}
          {isLoggedIn && (
            <>
              <div onClick={handleDropdownToggle}>
                <FaUserCircle size={25} />

                {/* Display dropdown if visible */}
                {isDropdownVisible && (
                  <div className="absolute top-full mr-4 mt-2 w-30">
                    {/* Dropdown Content */}
                    <div className="flex h-max w-[180px] flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[0_20px_25px_-5px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white">
                      <div className="mt-3 ml-4">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            👋 Hey, {user?.firstName}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

                      {/* Logout Link */}
                      <div className="ml-4 flex flex-col">
                        <a
                          onClick={signOutUser}
                          href=""
                          className="mt-3 text-sm font-semobold text-accent hover:text-red-500"
                        >
                          Log Out
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Cart Icon */}
          <div
            onClick={() => handleCartDisplay(isLoggedIn)}
            className="relative cursor-pointer"
          >
            <IoCartOutline className="text-[30px]" />

            {/* Cart Quantity Badge */}
            <div className="bg-accent w-[18px] h-[18px] absolute -right-1 -bottom-1 rounded-full text-white flex items-center justify-center text-sm font-medium">
              {totalCartQuantity}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </nav>
  );
};

export default Navbar;
