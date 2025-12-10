import Image from "next/image";

export default function CommingSoon() {
  return (
    <>
      <div className="carousel w-full">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/comingSoonMoviePosters/oppenheimer.webp"
              alt="Picture of the author"
              width={500}
              height={500}
              className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
            />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/comingSoonMoviePosters/logan.jpg"
              alt="Picture of the author"
              width={500}
              height={500}
              className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
            />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/comingSoonMoviePosters/theExorcist.jpeg"
              alt="Picture of the author"
              width={500}
              height={500}
              className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
            />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 4 */}
        <div id="slide4" className="carousel-item relative w-full">
          <div className="w-full flex justify-center items-center">
            <Image
              src="/comingSoonMoviePosters/unfrosted.webp"
              alt="Picture of the author"
              width={500}
              height={500}
              className="pt-10 w-full max-w-[500px] h-auto object-contain mx-auto"
            />
          </div>

          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
}
