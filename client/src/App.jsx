import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navigation/Navbar";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <>
      <Navbar />
      {/* <HomePage /> */}
      <MoviePage />
      <Footer />
    </>
  );
}

export default App;
