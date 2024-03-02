import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default App;
