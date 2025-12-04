"use client";

import { Movie } from "@/types/page";
import { use, useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from an API or database
    fetch("/api/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  return(
    <div>
        {movies.map((movie: Movie) => (
            <>
            <div>
            <div key={movie.id}>
                <h2>{movie.title}</h2>  
                <p>{movie.description}</p>
            </div>
            </div>
            </>
        ))}
    </div>

  )
    
}
