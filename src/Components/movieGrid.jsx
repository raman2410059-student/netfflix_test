import React from "react"
import MovieCard from "./MovieCard"
import movieService from "../Appwrite/MovieServices"

function MovieGrid({ movies }) {

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        No movies available.
      </div>
    )
  }

  return (
    <div className="px-6 py-10">
      
      <h2 className="text-2xl font-bold text-white mb-8">
        Trending Now
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => {

          const thumbnailUrl =  movieService.getFilePreview(movie.thumbnail)

          return (
            <MovieCard
              key={movie.$id}
              id={movie.$id}
              title={movie.title}
              thumbnail={thumbnailUrl}
              category={movie.category}
              rating={movie.rating}
            />
          )
        })}
      </div>

    </div>
  )
}

export default MovieGrid