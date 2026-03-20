import React from "react"
import { useNavigate } from "react-router-dom"

function MovieCard({ id, title, thumbnail, category, rating }) {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-red-600/20"
    >
      
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-60 object-cover"
        />

        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition flex items-center justify-center">
          <span className="text-white text-sm bg-red-600 px-4 py-2 rounded-full">
            View Details
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg truncate">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
          <span>{category}</span>
          <span>⭐ {rating}</span>
        </div>
      </div>

    </div>
  )
}

export default MovieCard