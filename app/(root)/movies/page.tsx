/* eslint-disable @next/next/no-img-element */
"use client";

import { Movie } from "@/types/page";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_Route } from "@/utils/routes";

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

        const response = await fetch(`${API_Route}/api/movies`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch movies: ${response.status} ${response.statusText}`,
          );
        }

        const data: Movie[] = await response.json();

        const validMovies = data.filter(
          (movie) => movie.name && movie.img && Array.isArray(movie.showtimes),
        );

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
        (genre: string) => genre.toLowerCase() === selectedGenre.toLowerCase(),
      );
    });
  }, [movies, selectedGenre]);

  const handleShowtimeSelection = async (time: string, movieName: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.id) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${API_Route}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          movieName,
          showtime: time,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      setSelectedMovie(null);
      router.push("/myShowtimes");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };
  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
        <span className="text-white text-lg font-medium mt-4">
          Loading movies...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Unable to Load Movies
        </h2>
        <p className="text-gray-300 mb-6">{error}</p>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold mb-6 text-white">
            In Theaters
          </h1>

          <div className="mb-8">
            <select
              className="select select-bordered w-full max-w-xs bg-white text-black"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="All">All Genres</option>
              {genres.map((genre) => (
                <option key={genre}>{genre}</option>
              ))}
            </select>

            <p className="text-gray-400 text-sm mt-2">
              Showing {filteredMovies.length} of {movies.length} movies
            </p>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie, index) => {
              const safeTrailerUrl = movie.trailerUrl?.startsWith("http")
                ? movie.trailerUrl
                : `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    movie.name + " trailer",
                  )}`;

              return (
                <article
                  key={movie.id || `${movie.name}-${index}`}
                  className="card bg-base-200 shadow-xl rounded-xl overflow-hidden flex flex-col"
                >
                  <figure className="relative w-full h-64">
                    <img
                      src={`moviePosters/${movie.img}`}
                      alt={movie.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) =>
                        (e.currentTarget.src = "https://placehold.co/600x400")
                      }
                    />

                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {movie.rating}
                    </div>
                  </figure>

                  <div className="bg-gray-100 card-body p-4 flex flex-col">
                    <h2 className="card-title text-lg font-bold text-gray-900">
                      {movie.name}
                    </h2>

                    <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                      {movie.description}
                    </p>

                    <div className="mt-auto space-y-2">
                      <button
                        onClick={() => setSelectedMovie(movie)}
                        className="btn bg-red-600 hover:bg-red-700 text-white w-full"
                      >
                        View Showtimes
                      </button>

                      <Link
                        href={safeTrailerUrl}
                        target="_blank"
                        className="btn bg-gray-800 hover:bg-gray-900 text-white w-full"
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
      </div>

      {/* Showtime Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="absolute inset-0" onClick={handleCloseModal} />

          <div className="relative bg-gray-900 border border-gray-700 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <button
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-8 h-8"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedMovie.name} Showtimes
            </h2>

            <div className="space-y-3">
              {selectedMovie.showtimes?.map((time, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleShowtimeSelection(time, selectedMovie.name)
                  }
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
