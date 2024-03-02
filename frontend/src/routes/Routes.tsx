import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Store from "../pages/store/Store";
import SingleBook from "../pages/single-book/SingleBook";
import Homepage from "../pages/homepage/Homepage";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Contact from "../components/contact-us/Contact";
import Success from "../stripe/success/Success";
import Failed from "../stripe/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/single-book/:id",
        element: <SingleBook />,
      },
      {
        path: "/store",
        element: <Store />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/failed",
    element: <Failed />,
  },
]);

export default router;
