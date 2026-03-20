import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import movieService from "../Appwrite/MovieServices"

function Movies() {

  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movieService.getMovies()
        if (response) {
          setMovies(response.documents)
        }
      } catch (error) {
        console.log("Error fetching movies", error)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Movies</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {movies.map((movie) => (
          <div
            key={movie.$id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/movie/${movie.$id}`)}
          >
            <img
              src={movieService.getFilePreview(movie.thumbnail)}
              alt={movie.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />
            <h3 style={{ marginTop: "10px" }}>
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Movies