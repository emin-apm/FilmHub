import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import NotFound404 from "./components/404/notFound404";
import ExplorePage from "./pages/ExplorePage";
import TrendingPage from "./pages/TrendingPage";
import TVShowsPage from "./pages/TVShowsPage";
import WatchLaterPage from "./pages/WatchLaterPage";

function App() {
  {
    /* TO DO: create ROUTES   */
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound404 />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/:media_type/:id", element: <MoviePage /> },
        { path: "/explore", element: <ExplorePage /> },
        { path: "/trending", element: <TrendingPage /> },
        { path: "/tvshows", element: <TVShowsPage /> },
        { path: "/watch-later", element: <WatchLaterPage /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
