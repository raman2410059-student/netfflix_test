import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Store from './Store/Store.js'
import  Dashboard from './Components/AdminWork/Dashboard.jsx'
import MoviesList from './Components/AdminWork/MoviesList.jsx'
import AddMovies from './Components/AdminWork/AddMovies.jsx'
import AdminLayout from './Components/AdminWork/AdminLayout.jsx'

import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
// import Trending from './Pages/Trending.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Login from './pages/LoginPage.jsx'
import Signup from './pages/SignupPage.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'
const router = createBrowserRouter([
  { path: "/login", 
        element: (
      <ProtectedRoute authentication={false}>
        <Login />
      </ProtectedRoute>
    ) 
      },
      { path: "/signup", 
        element: (
      <ProtectedRoute authentication={false}>
        <Signup />
      </ProtectedRoute>
    )
       },
   {
    path: "/",
    element:  <App />, 
    children: [
      { index: true, 
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      { path: "movies", 
        element: (
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        ) 
      },
   //   { path: "trending", element: <Trending /> },
      { path: "movie/:id", 
       element: (
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        )
      },
      
    ]
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "movies", element: <MoviesList /> },
      { path: "add-movie", element: <AddMovies /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={Store}>
      <RouterProvider router= {router}/>
    </Provider>
  // </StrictMode>,
)
