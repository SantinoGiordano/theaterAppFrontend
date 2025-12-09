"use client";

import { Movie } from "@/types/page";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="bg-black p-6">
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
              </div>

              <div className="text-s opacity-70">
                Movie Name: {movie.name}
                <p className="text-xs mt-2 opacity-60">
                  Directed by: {movie.directors}
                </p>
              </div>

              <div className="card-actions mt-4">
                <button
                  className="btn btn-primary btn-sm w-full"
                  onClick={() => setSelectedMovie(movie)}
                >
                  View Showtime
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {selectedMovie.name} Showtimes
            </h2>

            <div className="flex flex-col gap-2">
              {selectedMovie.showtimes.map((time: string, index: number) => (
                <div key={index} className="p-2 bg-gray-200 rounded text-center">
                  {time}
                </div>
              ))}
            </div>

            <button
              className="btn btn-error btn-sm w-full mt-4"
              onClick={() => setSelectedMovie(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
