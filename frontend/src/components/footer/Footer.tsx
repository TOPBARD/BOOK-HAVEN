import { Link } from "react-router-dom";
import { Input } from "../../assets/shadcn-ui/components/input";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { useAuth } from "../../shared/context/AuthProvider";
import { FormEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { User } from "../../shared/interface/User";
import toast from "react-hot-toast";

/**
 * Footer component represents the footer section of the application.
 * It includes a newsletter subscription form and social media links.
 */
export default function Footer() {
  // Authentication context to check if the user is logged in
  const { isLoggedIn, token } = useAuth();

  // State to manage the email input in the newsletter subscription form
  const [email, setEmail] = useState("");

  /**
   * Handles the newsletter subscription form submission.
   * Alerts the user to log in if not authenticated, then sends a subscription request.
   * @param {FormEvent} e - The form submission event.
   */
  const subscribeToNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please Login To Subscribe To Newsletter");
    }
    try {
      const response: AxiosResponse<User> = await axios.post(
        `${process.env.BACKEND_URL}/user/subscribe`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.isSubscribed) {
        toast.success("User Subscribed Successfully!!");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        // User is already subscribed, show alert
        toast.error("User is already subscribed to the newsletter");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <footer className="pt-12 xl:pt-24 bg-primary text-white text-center">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          {/* Newsletter Subscription Section */}
          <div>
            <h2 className="capitalize leading-tight mb-2">
              Subscribe to our newsletter
            </h2>
            <p className="text-white/60">
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
          </div>
          <form
            className="flex flex-col xl:flex-row w-full max-w-[720px] mx-auto gap-5"
            onSubmit={(e) => subscribeToNewsletter(e)}
          >
            {/* Email Input for Newsletter Subscription */}
            <Input
              placeholder="Your email address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Subscribe Button */}
            <button className="btn w-full xl:max-w-[150px] h-[60px] btn-accent">
              Join Now
            </button>
          </form>

          {/* Social Media Links Section */}
          <div className="flex gap-8 mx-auto text-[20px] text-white/60 mb-20">
            <Link to={""}>
              <FaYoutube />
            </Link>
            <Link to={""}>
              <FaTwitter />
            </Link>
            <Link to={""}>
              <FaInstagram />
            </Link>
            <Link to={""}>
              <FaFacebook />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Copyright Section */}
      <div className="py-6 border-t border-white/5 text-white/60">
        Copyright &copy; 2024 Book-Haven. All rights reserved.
      </div>
    </footer>
  );
}
