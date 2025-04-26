import { useQuery } from "@tanstack/react-query";
import Hero from "../components/Hero/Hero";
import PopularMovies from "../components/PopularMovies/PopularMovies";
import axios from "axios";

export default function HomePage() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await axios.get("https://ghibliapi.vercel.app/films");
      return res.data;
    },
  });
  console.log(movies);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Hero />
      <PopularMovies />
      <PopularMovies />
      <PopularMovies />
    </>
  );
}
