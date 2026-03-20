import { useState, useEffect} from "react"
import { useDispatch } from "react-redux"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { Outlet } from "react-router-dom"
import authService from "./Appwrite/AuthServices"
import {login, logout} from './Store/AuthSlice'
function App() {
const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
           if (userData) {
            dispatch(login({userData}))
           } else{
            dispatch(logout())
           }
    })
    .finally(() => setLoading(false))
  }, [])
  if(loading) {
    return ( 
  <div className="min-h-screen flex items-center justify-center bg-black">
      <p className="text-white text-lg">Loading...</p>
    </div>
    )
  }
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className="min-h-screen bg-black text-white flex flex-col">
  <Header />

  <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
    <Outlet />
  </main>

  <Footer />
</div>
</div>
)    
}

export default App
