import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../interface/User";
import { useCart } from "./CartProvider";
import { AuthContextProps } from "../interface/AuthContextProps";

// Create the AuthContext with initial value undefined
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

// AuthProvider is a component that wraps its children with AuthContext.Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State variables for token, user, and cart
  const [token, setToken] = useState<string>(
    localStorage.getItem("authToken") ?? ""
  );
  const [user, setUser] = useState<User>();
  const { setCart } = useCart();

  // Function to store token in localStorage
  const storeTokenInLs = (token: string) => {
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  // Function to sign out the user
  const signOutUser = () => {
    setToken("");
    setUser(undefined);
    setCart([]);
    localStorage.removeItem("authToken");
  };

  // Check if the user is logged in based on the presence of a token
  let isLoggedIn = !!token;

  // Fetch user data when the token changes
  useEffect(() => {
    fetchUserData();
  }, [token]);

  // Function to fetch user data from the server
  const fetchUserData = async () => {
    try {
      const userData = await axios.get<User>(
        `${process.env.BACKEND_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(userData.data);
    } catch (error) {
      // Handle errors by signing out the user
      signOutUser();
      console.log("Error fetching user data");
    }
  };

  // Provide the context values to the AuthContext.Provider
  return (
    <AuthContext.Provider
      value={{ storeTokenInLs, signOutUser, isLoggedIn, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
