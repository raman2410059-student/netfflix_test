import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../CustomUI/Button'
import Input from '../CustomUI/Input'
import Logo from '../Logo'
import { login } from '../../Store/AuthSlice'
import authService from '../../Appwrite/AuthServices'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const newUser = await authService.getCurrentUser()
                if (newUser) {
                    dispatch(login({userData: newUser}))
                    navigate("/admin")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }    

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className='w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-800'>
            <div className="flex justify-center mb-6">
                    <span className="w-32">
                        <Logo width="100%" />
                    </span>
            </div>
                <h2 className="text-2xl font-bold text-white text-center mb-2">
                    Sign up to create account</h2>
                <p className="text-zinc-400 text-sm text-center mb-6">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="text-red-600 hover:text-red-500 font-medium transition"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>

                       <Input 
                        label = "Full Name:"
                        placeholder = "Enter your full name"
                        className="bg-zinc-800 border border-zinc-700 text-white"
                        {...register("name", {
                            required: true,
                        })}
                       />

                       <Input 
                                   label = "Email"
                                   placeholder='Enter your Email'
                                   type="email"
                                   className="bg-zinc-800 border border-zinc-700 text-white"
                                   {...register("email", {
                                       required: true,
                                        validate: {
                                               matchPattern: (value) => /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                               "Email address must be a valid address",
                                           }
                                   })}
                                    />

                                    <Input 
                                     label= "Password"
                                     placeholder='Enter your password'
                                     type='password'
                                      className="bg-zinc-800 border border-zinc-700 text-white"
                                     {...register("password", {
                                       required: true,
                                     })}
                                    />
                                    <Button
                                    type= "submit"
                                     className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                                    >Create Account</Button>

                    </div>
                </form>
        </div>
    </div>
  )
}

export default Signup