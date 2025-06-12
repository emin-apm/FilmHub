import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";
import ScrollToTop from "../../utils/useScrollToTop";

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
