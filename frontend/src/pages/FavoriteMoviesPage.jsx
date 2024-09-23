import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { useAuthStore } from "../store/authUser";

const FavoriteMoviesPage = () => {
  const {
    getFavoriteMovies,
    favroiteMovieList,
    removeMovieFromFavoriteMovies,
  } = useAuthStore();

  const sliderRef = useRef(null);

  useEffect(() => {
    getFavoriteMovies();
  }, [favroiteMovieList]);

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  const removeMovieFromFavorites = (id) => {
    removeMovieFromFavoriteMovies(id);
  };

  if (favroiteMovieList.length === 0) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              OOPS! No Favorite Movie Found
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {favroiteMovieList.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Favorite Movies/Tv Show</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {favroiteMovieList.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <div key={content.id} className="w-52 flex-none">
                    <Link
                      to={`/watch/${content.id}`}
                      className="w-52 flex-none"
                    >
                      <img
                        src={SMALL_IMG_BASE_URL + content.poster_path}
                        alt="Poster path"
                        className="w-full h-auto rounded-md"
                      />

                      <h4 className="mt-2 text-lg font-semibold">
                        {content.title || content.name}
                      </h4>
                    </Link>
                    <button
                      onClick={() => removeMovieFromFavorites(content.id)}
                    >
                      <Heart fill={"red"} />
                    </button>
                  </div>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FavoriteMoviesPage;
