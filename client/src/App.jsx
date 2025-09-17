import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import NotFoundPage from "./components/404/notFound404";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const TrendingPage = lazy(() => import("./pages/TrendingPage"));
const TVShowsPage = lazy(() => import("./pages/TVShowsPage"));
const WatchLaterPage = lazy(() => import("./pages/WatchLaterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: ":media_type/:id", element: <MoviePage /> },
        { path: "explore", element: <ExplorePage /> },
        { path: "trending", element: <TrendingPage /> },
        { path: "tvshows", element: <TVShowsPage /> },
        { path: "watch-later", element: <WatchLaterPage /> },
        { path: "profile", element: <ProfilePage /> },
      ],
    },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
