import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiSearch } from "react-icons/fi"

function SearchBar() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${query}`)
      setQuery("")
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative group hidden md:block"
    >
      <div className="flex items-center bg-[#1a1a1a] border border-gray-700 rounded-full px-4 py-2 transition-all duration-300 focus-within:border-red-600 focus-within:shadow-[0_0_10px_rgba(220,38,38,0.6)]">

        <FiSearch className="text-gray-400 mr-2 group-focus-within:text-red-500 transition" />

        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-40 focus:w-56 transition-all duration-300"
        />
      </div>
    </form>
  )
}

export default SearchBar