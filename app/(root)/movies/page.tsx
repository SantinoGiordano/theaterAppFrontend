/* eslint-disable @next/next/no-img-element */
"use client";

import { Movie } from "@/types/page";
import { useEffect, useState } from "react";

export default function MovieListing() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="p-6 min-h-screen">
        <h1 className="text-4xl font-extrabold mb-6 text-red-600 tracking-tight">
          Movie Collection
        </h1>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-xl text-red-600"></span>
          </div>
        ) : (
          /* Movies Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="card bg-base-200 shadow-xl rounded-xl overflow-hidden flex flex-col"
              >
                <figure>
                  <img
                    src={movie.img}
                    alt={movie.name}
                    className="w-full h-60 object-cover"
                  />
                </figure>

                <div className="bg-white card-body p-4 flex-1 flex flex-col">
                  <h2 className="card-title text-lg font-bold">{movie.name}</h2>

                  <p className="text-sm opacity-80 line-clamp-3">
                    {movie.description}
                  </p>

                  <div className="flex justify-between mt-4 text-sm opacity-75">
                    <p>⭐ {movie.rating}</p>
                    <p>⏱ {movie.runtime} min</p>
                  </div>

                  <p className="text-xs mt-2 opacity-70">
                    Directed by: {movie.directors}
                  </p>

                  <div className="mt-auto pt-4">
                    <button
                      className="btn p-2 bg-red-600 text-white btn-sm w-full shadow-md hover:shadow-lg rounded-xl"
                      onClick={() => setSelectedMovie(movie)}
                    >
                      View Showtime
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedMovie && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl w-80 shadow-2xl animate-slideUp relative">
              {/* Close Button */}
              <button
                className="cursor-pointer absolute top-3 right-3 bg-red-500 text-white hover:bg-red-600 rounded-full w-9 h-9 flex items-center justify-center shadow-md"
                onClick={() => setSelectedMovie(null)}
              >
                ✕
              </button>

              <h2 className="pt-5 text-2xl font-bold mb-4 text-center">
                {selectedMovie.name} Showtimes
              </h2>

              <div className="flex flex-col gap-2">
                {selectedMovie.showtimes.map((time, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-blue-800 text-blue-100 rounded-full text-center font-medium shadow-sm"
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Animations */}
        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }

          .animate-slideUp {
            animation: slideUp 0.35s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}
