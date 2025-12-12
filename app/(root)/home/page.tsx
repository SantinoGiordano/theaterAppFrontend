export default function Home() {
  return (
    <>
      {/* HERO / PARALLAX BANNER */}
      <div
        className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/theaterSeats.jpg')",
        }}
      >
        <div className="bg-black/60 p-10 rounded-lg text-center border border-red-600 shadow-xl">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg tracking-wide">
            Premier Cinemas
          </h1>
          <p className="text-gray-200 mt-4 text-lg max-w-2xl mx-auto">
            Where movies come to life with heart-pounding sound, crystal-clear
            screens, and unforgettable cinematic moments.
          </p>
        </div>
      </div>

      {/* NOW PLAYING SECTION */}
      <section className="py-16 bg-black text-white">
        <h2 className="text-4xl font-bold text-center mb-10 text-red-600">
          🎥 Now Playing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
          {/* Movie Cards */}
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="bg-gray-900 p-4 rounded-lg shadow-lg hover:scale-105 hover:border-red-500 border transition"
            >
              <img
                src={`/movies/now${num}.jpg`}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold mt-4">Movie Title {num}</h3>
              <p className="text-gray-400 text-sm">Genre | Runtime</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MOVIE */}
      <section className="py-20 bg-black text-white border-y border-red-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
          <img
            src="/parasiteMovieFeatured.jpeg"
            className="rounded-lg shadow-xl w-full md:w-1/2 border border-red-600"
          />

          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-red-500">
              ⭐ Featured Movie of the Week
            </h2>
            <h3 className="text-2xl text-white font-semibold">Parasite</h3>
            <p className="text-gray-300 mt-4 leading-relaxed">
              Bong Joon-ho’s modern masterpiece, *Parasite*, blends dark comedy,
              drama, and suspense into a sharp social commentary on class
              division. This Academy Award–winning film follows two families
              whose lives intertwine with shocking consequences.
            </p>
            <button className="mt-6 bg-red-600 px-6 py-3 rounded-lg text-white font-bold hover:bg-red-500 shadow-lg transition">
              Buy Tickets
            </button>
          </div>
        </div>
      </section>

      {/* COMING SOON SECTION */}
      <section className="py-16 bg-gray-900 text-white">
        <h2 className="text-4xl font-bold text-center mb-10 text-red-600">
          🍿 Coming Soon
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
          {/* Coming movies */}
          {[
            { title: "Deadpool 3", date: "July 2025", img: "coming1" },
            { title: "Joker 2", date: "October 2025", img: "coming2" },
            { title: "Sonic 3", date: "December 2025", img: "coming3" },
            { title: "Fantastic Four", date: "March 2026", img: "coming4" },
          ].map((movie, i) => (
            <div
              key={i}
              className="bg-black p-4 rounded-lg shadow-lg hover:scale-105 hover:border-red-500 border transition"
            >
              <img
                src={`/movies/${movie.img}.jpg`}
                className="rounded-lg w-full"
              />
              <h3 className="text-xl font-semibold mt-4">{movie.title}</h3>
              <p className="text-gray-400 text-sm">Releases {movie.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-red-600">
            About Premier Cinemas
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Premier Cinemas has delivered world-class cinematic experiences for
            over 20 years. With cutting-edge projection systems, immersive
            surround sound, and luxury seating, we bring movies to life like
            never before.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mt-4">
            Enjoy IMAX, Dolby Digital, recliner seating, gourmet concessions,
            and exclusive premiere events for movie lovers of all ages.
          </p>
        </div>
      </section>
    </>
  );
}
