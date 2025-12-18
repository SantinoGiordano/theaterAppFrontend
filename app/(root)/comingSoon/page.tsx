"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CommingSoon() {
  const [slide, setSlide] = useState(1);
  const [movies, setMovies] = useState([]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev === 4 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.location.hash = `#slide${slide}`;
  }, [slide]);

  useEffect(() => {
    async function fetchComingSoonMovies() {
      const res = await fetch(`/api/movies/comingSoon`);
      const data = await res.json();
      setMovies(data);
    }
  }, []);
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
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/comingSoonMoviePosters/oppenheimer.webp"
              alt="Oppenheimer poster"
              width={500}
              height={500}
              className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
            />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/comingSoonMoviePosters/logan.jpg"
              alt="Logan poster"
              width={500}
              height={500}
              className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
            />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/comingSoonMoviePosters/theExorcist.jpeg"
              alt="The Exorcist poster"
              width={500}
              height={500}
              className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
            />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        {/* Slide 4 */}
        <div id="slide4" className="carousel-item relative w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/comingSoonMoviePosters/unfrosted.webp"
              alt="Unfrosted poster"
              width={500}
              height={500}
              className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
            />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
