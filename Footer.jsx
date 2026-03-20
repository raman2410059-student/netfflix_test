import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400 text-sm">

          <div>
            <h3 className="text-white font-semibold mb-4">NetflixHybrid</h3>
            <p className="leading-relaxed">
              A Netflix–YouTube hybrid streaming platform built with React and Appwrite.
              Explore trending movies, discover new content, and enjoy seamless streaming.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white transition">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-white transition">
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Support
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} NetflixHybrid. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer