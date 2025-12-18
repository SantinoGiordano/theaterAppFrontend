"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ComingSoonMovie } from "@/types/page";
import { API_Route } from "@/utils/routes";

export default function ComingSoon() {
  const [slide, setSlide] = useState(1);
  const [movies, setMovies] = useState<ComingSoonMovie[]>([]);

  // Auto-advance
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setSlide((prev) => (prev === movies.length ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  // Sync hash with slide
  useEffect(() => {
    if (movies.length > 0) {
      window.location.hash = `#slide${slide}`;
    }
  }, [slide, movies.length]);

  useEffect(() => {
    async function fetchComingSoonMovies() {
      const res = await fetch(`${API_Route}/api/comingSoon`);
      const data = await res.json();
      setMovies(data);
    }

    fetchComingSoonMovies();
  }, []);

  if (movies.length === 0) return null;

  return (
    <>
      <div className="text-center mt-6">
        <h2 className="text-2xl text-red-500 font-bold">
          Coming Soon to Theaters
        </h2>
        <p className="text-red-400 mt-2">
          Stay tuned for exciting upcoming releases!
        </p>
      </div>

      <div className="carousel w-full">
        {movies.map((movie, index) => {
          const slideId = index + 1;
          const prevSlide = slideId === 1 ? movies.length : slideId - 1;
          const nextSlide = slideId === movies.length ? 1 : slideId + 1;

          return (
            <div
              key={movie._id}
              id={`slide${slideId}`}
              className="carousel-item relative w-full"
            >
              <div className="w-full flex justify-center items-center">
                <Image
                  src={`/comingSoonMoviePosters/${movie.img}`}
                  alt={movie.title ?? "Coming Soon Movie Poster"}
                  width={500}
                  height={500}
                  className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
                />
              </div>

              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#slide${prevSlide}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${nextSlide}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
