import React, { useEffect, useState } from "react"
import MovieGrid from "../Components/movieGrid"
import movieService from "../Appwrite/MovieServices"
import HeroSection from "../Components/HeroSection"

function Home() {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movieService.getAllMovies()
        if (response) {
          setMovies(response.documents)
        }
      } catch (error) {
        console.log("Home :: fetchMovies :: error", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="bg-[#0f0f0f] min-h-screen">

      {loading ? (
        <div className="text-center text-gray-400 py-20">
          Loading movies...
        </div>
      ) : (
        <>
        <HeroSection movie={movies[0]} />
        <MovieGrid movies={movies} />
        </>)}
      
    </div>
  ) 
}

export default Home