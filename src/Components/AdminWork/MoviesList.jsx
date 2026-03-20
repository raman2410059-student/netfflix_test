import React, { useState, useEffect } from 'react'
import movieService from '../../Appwrite/MovieServices'
import { useSelector } from 'react-redux';

export default function MoviesList() {

    const [movies, setMovies] = useState([]);
    const { status } = useSelector(state => state.auth)
   useEffect(() => {
    if (!status) return   
    const fetchMovies = async () => {
      try {
        const response = await movieService.getAllMovies()
        setMovies(response.documents)  
      } catch (error) {
        console.log("Fetch movies error:", error)
      }
    }

    fetchMovies()

  }, [status])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Movies</h1>

      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((movie) => (
            <tr key={movie.$id} className="border-b">
              <td className="p-3">{movie.title}</td>
              <td className="p-3">{movie.category}</td>
              <td className="p-3 flex gap-3">
                <button className="text-blue-600">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

