import axios, { AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthProvider";
import { FaAngleLeft } from "react-icons/fa6";
import toast from "react-hot-toast";

/**
 * Login Component
 * Displays the login form for users to log in.
 * @returns {JSX.Element} - Login JSX element
 */
const Login: React.FC = () => {
  //State to store username and password
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //Context Function to store token in browser storage
  const { storeTokenInLs } = useAuth();

  /**
   * Handles the login process when the form is submitted.
   * @param {FormEvent} e - Form submit event
   */
  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    const loginData = {
      username,
      password,
    };
    try {
      const response: AxiosResponse<{ access_token: string }> =
        await axios.post("http://localhost:5000/auth/login", loginData);
      storeTokenInLs(response.data.access_token);
      toast.success("Login Successful!!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      {/* Left Content: Background Image */}
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://images.unsplash.com/photo-1528700850553-6a45e6f143db?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content: Login Form */}
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          {/* Login Form */}
          <form className="mt-6" onSubmit={loginUser}>
            {/* Email Input */}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                minLength={8}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <a
                href=""
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          {/* Google Login Button */}
          <hr className="my-6 border-gray-300 w-full" />
          {/* <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlinkHref="" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              <span className="ml-4">Log in with Google</span>
            </div>
          </button> */}

          {/* Register Link */}
          <p className="mt-8">
            Need an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
          {/* Back to Home Button */}
          <div className="flex items-start mt-4">
            <FaAngleLeft
              size={20}
              className="text-gray-500 hover:text-gray-700 "
            />
            <Link
              to="/"
              className="text-sm  text-gray-500 hover:text-gray-700 font-semibold block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
