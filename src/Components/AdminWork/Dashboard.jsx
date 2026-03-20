export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Movies</h2>
          <p className="text-3xl mt-2">--</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">--</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-3xl mt-2">--</p>
        </div>
      </div>
    </div>
  )
}