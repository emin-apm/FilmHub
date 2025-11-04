import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";
import ScrollToTop from "../../utils/useScrollToTop";
import Snowfall from "../../components/Christmas/Snow/Snowfall";
import Halloween from "../../components/Christmas/Halloween/Halloween";

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      {/* <Snowfall /> */}
      <Halloween />
      <Outlet />
      <Footer />
    </>
  );
}
