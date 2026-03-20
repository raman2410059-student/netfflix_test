import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import movieService from "../Appwrite/MovieServices"

function MovieDetails() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMovie = async () => {
           try {
             const response = await movieService.getMovieById(id)
            if (response) {
                setMovie(response)
            }
           } catch (error) {
            console.log("MovieDetails : fetchMovie : error ", error);
           }finally{
            setLoading(false)
           }
        }

        fetchMovie()
    }, [id])

    if (loading) {
        return (
      <div className="bg-[#0f0f0f] min-h-screen text-gray-400 flex items-center justify-center">
        Loading movie...
      </div>
    )
    }

    if (!movie){
        return <div className="bg-[#0f0f0f] min-h-screen text-red-500 flex items-center justify-center">
        Movie not found.
      </div>
    }
     
    const bannerUrl = movieService.getFilePreview(movie.banner)
  return (
   <div className="bg-[#0f0f0f] min-h-screen">

      <Header />

      <div className="relative h-[70vh] w-full overflow-hidden">

        <img
          src={bannerUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="absolute bottom-20 left-10 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          <p className="text-gray-300 mb-6">
            {movie.description}
          </p>

          <div className="flex items-center gap-4 mb-6 text-gray-400">
            <span>⭐ {movie.rating}</span>
            <span>{movie.category}</span>
            <span>{movie.releaseYear}</span>
          </div>

          <button
            onClick={() => alert("Streaming feature coming soon!")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            ▶ Watch Now
          </button>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default MovieDetails