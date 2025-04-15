import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
