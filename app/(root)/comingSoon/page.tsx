"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ComingSoonMovie } from "@/types/page";
import { API_Route } from "@/utils/routes";

export default function ComingSoon() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState<ComingSoonMovie[]>([]);

  useEffect(() => {
    async function fetchComingSoonMovies() {
      const res = await fetch(`${API_Route}/api/comingSoon`);
      const data = await res.json();
      setMovies(data);
    }

    fetchComingSoonMovies();
  }, []);

  if (movies.length === 0) return null;

  const movie = movies[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === movies.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full bg-black bg-opacity-90 rounded-lg shadow-lg border border-red-700 p-6">

      {/* STATIC HEADER */}
      <div className="relative w-full max-w-3xl mx-auto mt-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest
          text-transparent bg-clip-text bg-gradient-to-r
          from-red-400 via-red-500 to-red-700 drop-shadow-lg">
          Coming Soon
        </h2>

        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-red-600" />
          <p className="text-gray-300 text-sm md:text-base tracking-wide uppercase">
            In Theaters Soon
          </p>
          <span className="h-px w-12 bg-red-600" />
        </div>

        <p className="mt-3 text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Stay tuned for the most anticipated upcoming releases
          hitting the big screen.
        </p>
      </div>

      {/* DYNAMIC MOVIE CONTENT */}
      <div className="flex flex-col items-center justify-center mt-10">

        <Image
          key={movie._id} // important for smooth swap
          draggable={false}
          src={`/comingSoonMoviePosters/${movie.img}`}
          alt={movie.name ?? "Coming Soon Movie Poster"}
          width={500}
          height={500}
          className="w-full max-w-[500px] h-auto object-contain mx-auto drop-shadow-lg transition-all duration-500"
        />

        {movie.description && (
          <p className="mt-6 text-center text-lg max-w-xl text-gray-200 bg-gradient-to-r from-black via-gray-900 to-black rounded px-4 py-3 border-t border-b border-red-700 shadow-md transition-all duration-500">
            <span className="text-red-500 font-semibold">
              Description:{" "}
            </span>
            <span>{movie.description}</span>
          </p>
        )}
      </div>

      {/* ARROWS */}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
        <button onClick={prevSlide} className="btn btn-circle">
          ❮
        </button>
        <button onClick={nextSlide} className="btn btn-circle">
          ❯
        </button>
      </div>
    </div>
  );
}