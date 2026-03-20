import React from 'react'
import { Link, NavLink,} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../Logo'
import LogoutBtn from '../CustomUI/LogoutBtn'
import SearchBar from './SearchBar'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)

   const NavItems = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Movies",
    path: "/movies"
  },
  {
    name: "Trending",
    path: "/trending"
  }
]
   return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className='flex items-center gap-8'>
        <Link to="/" className="text-2xl font-bold text-red-600 tracking-wide">
          <Logo />
        </Link>

        {authStatus && (<nav className="hidden md:flex items-center gap-6">
          {NavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-red-600"
                    : "text-gray-300 hover:text-white"
                }`}>
              {item.name}
            </NavLink>
          ))}
        </nav>)}
        </div>

       {authStatus && (
          <div className="flex items-center gap-4">

            <SearchBar />

            <LogoutBtn />
          </div>
        )}

      </div>
    </header>
  )
}

export default Header