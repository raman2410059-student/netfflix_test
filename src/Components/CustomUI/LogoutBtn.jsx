import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/AuthServices'
import { logout } from '../../Store/AuthSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const  logoutHandler = () => {
    authService.logout()
    .then(() => {
        dispatch(logout())
        navigate("/login")
    })
  }
  return (
    <button
    onClick={logoutHandler}
    className='bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition'
    >Logout</button>
  )
}

export default LogoutBtn