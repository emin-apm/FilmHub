import Hero from "./components/Hero/Hero";
import PopularMovies from "./components/PopularMovies/PopularMovies";
import Navbar from "./layouts/Navigation/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularMovies />
      <PopularMovies />
      <PopularMovies />
    </>
  );
}

export default App;
