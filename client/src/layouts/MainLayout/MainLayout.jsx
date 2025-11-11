import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navigation/Navbar";
import ScrollToTop from "../../utils/useScrollToTop";
import React, { Suspense } from "react";

const Snowfall = React.lazy(() =>
  import("../../components/Christmas/Snow/Snowfall")
);
const Halloween = React.lazy(() =>
  import("../../components/Christmas/Halloween/Halloween")
);

export default function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Suspense fallback={null}>
        <Snowfall />
        {/* <Halloween /> */}
      </Suspense>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
