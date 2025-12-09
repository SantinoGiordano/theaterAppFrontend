"use client";

import { Movie } from "@/types/page";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className=" bg-black p-6">
      <h1 className="text-3xl font-bold mb-6">Movie Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie: Movie, index) => (
          <div
            key={index}
            className="card bg-base-200 shadow-xl rounded-xl overflow-hidden"
          >
            <figure>
              <img
                src={movie.img}
                alt={movie.name}
                className="w-full h-60 object-cover"
              />
            </figure>

            <div className="bg-white card-body p-3">
              <h2 className="card-title text-lg font-bold">{movie.name}</h2>

              <p className="text-sm opacity-80">{movie.description}</p>

              <div className="flex justify-between mt-4 text-sm opacity-75">
                <p>⭐ {movie.rating}</p>
                <p>⏱ {movie.runtime} min</p>
                <p>times: {movie.showtime}</p>
              </div>

              <div className="text-s opacity-70">
              Movie Name: {movie.name}
              <p className="text-xs mt-2 opacity-60">
                Directed by: {movie.directors}
              </p>
              </div>

              <div className="card-actions mt-4">
                <button className="btn btn-primary btn-sm w-full">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
