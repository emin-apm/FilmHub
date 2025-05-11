import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import NotFound404 from "./components/404/notFound404";
import ExplorePage from "./pages/ExplorePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound404 />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/movie/:id", element: <MoviePage /> },
        { path: "/explore", element: <ExplorePage /> },
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
