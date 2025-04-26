import { useQuery } from "@tanstack/react-query";
import Hero from "../components/Hero/Hero";
import PopularMovies from "../components/PopularMovies/PopularMovies";

export default function HomePage() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch("https://ghibliapi.vercel.app/films");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });
  console.log(movies);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Hero />
      <PopularMovies />
      <PopularMovies />
      <PopularMovies />
    </>
  );
}
