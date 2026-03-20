import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import Button from '../CustomUI/Button'
import Input from '../CustomUI/Input'
import Logo from '../Logo'
import { login as authLogin } from '../../Store/AuthSlice'
import authService from '../../Appwrite/AuthServices'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData =await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin({userData: userData}))
                   navigate("/admin")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
  <div className="min-h-screen flex items-center justify-center bg-black px-4">
    <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-800">

      <div className="flex justify-center mb-6">
        <span className="w-32">
          <Logo width="100%" />
        </span>
      </div>

      <h2 className="text-2xl font-bold text-white text-center mb-2">
        Sign in to your account
      </h2>

      <p className="text-zinc-400 text-sm text-center mb-6">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="text-red-600 hover:text-red-500 font-medium transition"
        >
          Sign Up
        </Link>
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit(login)}
        className="space-y-5"
      >
        <div className="space-y-5">

          <Input
            label="Email"
            placeholder="Enter your Email"
            type="email"
            className="bg-zinc-800 border border-zinc-700 text-white"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
            })}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            className="bg-zinc-800 border border-zinc-700 text-white"
            {...register("password", {
              required: true,
            })}
          />

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign in
          </Button>

        </div>
      </form>

    </div>
  </div>
)
}

export default Login