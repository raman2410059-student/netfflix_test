import { Outlet, NavLink } from "react-router-dom"

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <aside className="w-64 bg-black text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <NavLink to="/admin" className="hover:text-red-500">
            Dashboard
          </NavLink>
          <NavLink to="/admin/movies" className="hover:text-red-500">
            Movies
          </NavLink>
          <NavLink to="/admin/add-movie" className="hover:text-red-500">
            Add Movie
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}