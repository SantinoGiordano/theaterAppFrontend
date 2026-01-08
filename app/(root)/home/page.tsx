"use client";

import { ComingSoonMovie, FeaturedMovie, Movie } from "@/types/page";
import { API_Route } from "@/utils/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<ComingSoonMovie[]>(
    []
  );
  const [featured, setFeatured] = useState<FeaturedMovie[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchRandomMovies() {
      const res = await fetch(`${API_Route}/api/movies/random`);
      const data = await res.json();
      setMovies(data);
    }

    fetchRandomMovies();
  }, []);

  useEffect(() => {
    async function fetchComingSoonMovies() {
      const res = await fetch(`${API_Route}/api/comingSoon`);
      const data = await res.json();
      setComingSoonMovies(data);
    }
    fetchComingSoonMovies();
  }, []);

  useEffect(() => {
    async function featchFeaturedMovie() {
      const response = await fetch(`${API_Route}/api/featuredMovie`);
      const data = await response.json();

      console.log("FEATURED RESPONSE:", data);
      console.log("IS ARRAY?", Array.isArray(data));

      setFeatured(data);
    }

    featchFeaturedMovie();
  }, []);

  return (
    <>
      {/*--------Header Section ---------------*/}
      <div
        className="
    min-h-[60vh] 
    sm:min-h-[70vh] 
    md:min-h-[80vh] 
    lg:min-h-screen
    bg-fixed bg-cover bg-center 
    flex items-center justify-center 
    px-4
  "
        style={{
          backgroundImage: "url('/theaterSeats.jpg')",
        }}
      >
        <div
          className="
    bg-black/60 
    p-6 sm:p-8 md:p-10 
    rounded-xl 
    text-center 
    border border-red-600 
    shadow-xl
    max-w-3xl
  "
        >
          <h1
            className="
      text-3xl 
      sm:text-4xl 
      md:text-5xl 
      lg:text-6xl 
      font-extrabold 
      text-white 
      drop-shadow-lg 
      tracking-wide
    "
          >
            Premier Cinemas
          </h1>
        </div>
      </div>
      {/*--------Four Random Movies -----------*/}
      <section className="py-16 bg-black text-white">
        <h2 className="text-4xl font-bold text-center mb-10 text-red-600">
          🎥 Now Playing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
          {movies.map((movie: Movie, index) => (
            <div
  onClick={() => router.push("./movies")}
  key={index}
  className="
    bg-gray-900 p-4 rounded-lg shadow-lg border
    transition
    cursor-pointer
    md:hover:scale-105
  "
>
  <img
    draggable="false"
    alt={movie.name}
    src={`moviePosters/${movie.img}`}
    className="
      rounded-lg w-full
      aspect-[2/3]
      object-cover
    "
  />

  <h3 className="text-lg sm:text-xl font-semibold mt-4">
    {movie.name}
  </h3>

  <hr className="my-2 border-white/30" />

  <div className="text-sm text-gray-400 line-clamp-3">
    {movie.description}
  </div>
</div>

          ))}
        </div>
      </section>
      {/*--------FEATURED MOVIE----------------*/}
      <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-3 text-white">
              <span className="text-red-500">⭐</span> Featured Movie of the
              Week
            </h2>
          </div>

          {featured.map((movie: FeaturedMovie) => (
            <div
              key={movie._id}
              className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-colors duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-1/2 relative">
                  <img
                    alt={movie.name}
                    src={movie.img}
                    className="w-full h-[400px] lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      FEATURED
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                    {movie.name}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    {movie.description}
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-6 text-gray-400">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-2">⭐</span>
                        <span>{movie.score || "None"}</span>
                      </div>
                      <span>•</span>
                      <span>{movie.runtime + " min" || "None"}</span>
                      <span>•</span>
                      <span>{movie.rating || "None"}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={movie.trailerUrl || "https://www.youtube.com/"}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                      >
                        Watch Trailer
                      </Link>
                      {/* <button className="border border-gray-700 hover:border-red-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                        Add to List
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold text-center mb-10 text-red-600">
          🍿 Coming Soon
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
          {comingSoonMovies.map((movie, index) => (
            <div
              key={index}
              className="bg-black p-4 rounded-lg shadow-lg hover:scale-105 hover:border-red-500 border transition"
              onClick={()=> router.push("/comingSoon")}
            >
              <img
                width={250}
                height={250}
                draggable="false"
                alt={movie.name}
                src={`/comingSoonMoviePosters/${movie.img}`}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold mt-4">{movie.name}</h3>
              <p className="text-gray-400 text-sm">
                Releases {movie.releaseDate}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-red-600">
            About Premier Cinemas
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Premier Cinemas has delivered world-class cinematic experiences for
            over 20 years. With cutting-edge projection systems, immersive
            surround sound, and luxury seating, we bring movies to life like
            never before.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mt-4">
            Enjoy IMAX, Dolby Digital, recliner seating, gourmet concessions,
            and exclusive premiere events for movie lovers of all ages.
          </p>
        </div>
      </section>
    </>
  );
}
