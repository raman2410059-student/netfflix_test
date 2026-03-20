import React from "react"
import { useNavigate } from "react-router-dom"
import movieService from "../Appwrite/MovieServices"

function HeroSection({ movie }) {
  const navigate = useNavigate()

  if (!movie) return null

  const bannerUrl = movieService.getFilePreview(movie.thumbnail)

  const handleWatch = () => {
    navigate(`/movie/${movie.$id}`)
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">

      {/* Background Image */}
      <img
        src={bannerUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-20 left-10 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {movie.title}
        </h1>

        <p className="text-gray-300 mb-6 line-clamp-3">
          {movie.description}
        </p>

        <button
          onClick={handleWatch}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          ▶ Watch Now
        </button>
      </div>

    </div>
  )
}

export default HeroSection