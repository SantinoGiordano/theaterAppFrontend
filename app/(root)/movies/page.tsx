/* eslint-disable @next/next/no-img-element */
"use client";

import { Movie } from "@/types/page";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Genre =
  | "Sci-Fi"
  | "Drama"
  | "Adventure"
  | "Action"
  | "Crime"
  | "Thriller"
  | "Romance"
  | "Animation"
  | "Music";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function MovieListing() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const router = useRouter();

  const genres: Genre[] = [
    "Sci-Fi",
    "Drama",
    "Adventure",
    "Action",
    "Crime",
    "Thriller",
    "Romance",
    "Animation",
    "Music",
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/movies`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch movies: ${response.status} ${response.statusText}`
          );
        }

        const data: Movie[] = await response.json();

        const validMovies = data.filter(
          (movie) => movie.name && movie.img && Array.isArray(movie.showtimes)
        );

        if (validMovies.length === 0 && data.length > 0) {
          console.warn("No valid movies found in the response");
        }

        setMovies(validMovies.length > 0 ? validMovies : data);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err instanceof Error ? err.message : "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    if (selectedGenre === "All") return movies;

    return movies.filter((movie) => {
      let movieGenres: string[] = [];

      if (Array.isArray(movie.genres)) {
        movieGenres = movie.genres;
      } else if (typeof movie.genres === "string") {
        movieGenres = movie.genres.split(/[,|]/).map((g: string) => g.trim());
      }

      return movieGenres.some(
        (genre: string) => genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    });
  }, [movies, selectedGenre]);

  const handleShowtimeSelection = useCallback(
    (time: string, movieName: string) => {
      if (!time || !movieName) {
        console.error("Invalid showtime selection data");
        return;
      }

      router.push(
        `/checkout?movie=${encodeURIComponent(
          movieName
        )}&time=${encodeURIComponent(time)}`
      );
    },
    [router]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedMovie) {
        handleCloseModal();
      }
    };

    if (selectedMovie) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [selectedMovie, handleCloseModal]);

  useEffect(() => {
    if (!selectedMovie) return;

    const modalElement = document.querySelector(
      '[role="dialog"]'
    ) as HTMLElement;
    if (modalElement) {
      modalElement.focus();
    }
  }, [selectedMovie]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
        <div
          className="flex flex-col items-center justify-center space-y-4"
          role="status"
          aria-live="polite"
        >
          <span className="loading loading-spinner loading-lg text-red-600"></span>
          <span className="text-white text-lg font-medium">
            Loading movies...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Unable to Load Movies
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold mb-6 text-white tracking-tight">
            In Theaters
          </h1>

          <div className="mb-8">
            <label
              htmlFor="genre-select"
              className="block text-white text-sm font-medium mb-2"
            >
              Filter by Genre
            </label>
            <select
              id="genre-select"
              className="select select-bordered w-full max-w-xs bg-white text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              aria-label="Filter movies by genre"
            >
              <option value="All">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <p className="text-gray-400 text-sm mt-2">
              Showing {filteredMovies.length} of {movies.length} movies
              {selectedGenre !== "All" && ` in ${selectedGenre}`}
            </p>
          </div>
        </header>

        <main>
          {!loading && filteredMovies.length === 0 && (
            <div
              className="text-center py-12 rounded-xl bg-gray-800/50 backdrop-blur-sm"
              role="status"
              aria-live="polite"
            >
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No Movies Found
              </h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                {selectedGenre !== "All"
                  ? `We don't have any ${selectedGenre.toLowerCase()} movies at the moment. Try another genre!`
                  : "No movies available at the moment. Please check back later."}
              </p>
              {selectedGenre !== "All" && (
                <button
                  onClick={() => setSelectedGenre("All")}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Show All Movies
                </button>
              )}
            </div>
          )}

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            role="list"
            aria-label="List of movies"
          >
            {filteredMovies.map((movie, index) => {
              const safeTrailerUrl = movie.trailerUrl?.startsWith("http")
                ? movie.trailerUrl
                : `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    movie.name + " trailer"
                  )}`;

              return (
                <article
                  key={movie.id || `${movie.name}-${index}`}
                  className="card bg-base-200 shadow-xl rounded-xl overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
                  role="listitem"
                >
                  <figure className="relative w-full h-64">
                    <img
                      src={`moviePosters/${movie.img}`}
                      alt={`Poster for ${movie.name}`}
                      draggable={false}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400";
                        e.currentTarget.alt = "Movie poster not available";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {movie.rating}
                    </div>
                  </figure>

                  <div className="bg-gray-100 card-body p-4 flex-1 flex flex-col">
                    <header>
                      <h2 className="card-title text-lg font-bold text-gray-900 mb-2">
                        {movie.name}
                      </h2>
                    </header>

                    <p className="text-sm text-gray-700 line-clamp-3 flex-1 mb-4">
                      {movie.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center text-gray-600">
                          <span className="mr-1">⭐</span>
                          {movie.rating || "N/A"}
                        </span>
                        <span className="flex items-center text-gray-600">
                          <span className="mr-1">⏱</span>
                          {movie.runtime || "N/A"} min
                        </span>
                      </div>

                      {movie.directors && (
                        <p className="text-xs text-gray-500 truncate">
                          Directed by: {movie.directors}
                        </p>
                      )}

                      {movie.genres && (
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(movie.genres)
                            ? movie.genres
                            : [movie.genres]
                          )
                            .slice(0, 3)
                            .map((genre, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                              >
                                {genre}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-4 space-y-2">
                      <button
                        onClick={() => setSelectedMovie(movie)}
                        className="btn bg-red-600 hover:bg-red-700 text-white w-full rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label={`View showtimes for ${movie.name}`}
                      >
                        View Showtimes
                      </button>

                      <Link
                        href={safeTrailerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" pt-2 block btn bg-gray-800 hover:bg-gray-900 text-white w-full rounded-lg shadow-md transition-all duration-200 text-center"
                        aria-label={`Watch trailer for ${movie.name}`}
                      >
                        Find Trailers
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        {selectedMovie && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            tabIndex={-1}
          >
            <div
              className="absolute inset-0"
              onClick={handleCloseModal}
              aria-label="Close modal"
            />
            <div
              className="relative bg-gray-900 border border-gray-700 p-6 rounded-2xl w-full max-w-md shadow-2xl animate-fadeInUp"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-red-600 text-white hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                onClick={handleCloseModal}
                aria-label="Close showtimes modal"
              >
                ✕
              </button>

              <header className="pr-8 mb-6">
                <h2 id="modal-title" className="text-2xl font-bold text-white">
                  {selectedMovie.name} Showtimes
                </h2>
                <p
                  id="modal-description"
                  className="text-gray-400 text-sm mt-1"
                >
                  Select a showtime to proceed with booking
                </p>
              </header>

              <div className="space-y-3">
                {selectedMovie.showtimes &&
                selectedMovie.showtimes.length > 0 ? (
                  selectedMovie.showtimes.map((time, index) => (
                    <button
                      onClick={() =>
                        handleShowtimeSelection(time, selectedMovie.name)
                      }
                      key={index}
                      className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-center font-medium shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                      aria-label={`Select showtime at ${time}`}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-400">No showtimes available</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Rating: {selectedMovie.rating || "N/A"}</span>
                  <span>Runtime: {selectedMovie.runtime || "N/A"} min</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }

        /* Improve focus visibility */
        *:focus:not(:focus-visible) {
          outline: none;
        }

        *:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
