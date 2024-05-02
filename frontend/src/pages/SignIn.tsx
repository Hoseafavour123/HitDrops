import logo from './../assets/logo.jpg'

import { Button, FloatingLabel } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export type LoginFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const {
    register,
    formState: { errors },
  } = useForm<LoginFormData>()

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center max-lg:p-3">
        <div className="flex-1">
          <Link to="/" className="sm:text-xl font-bold dark:text-white">
            <span className="px-4 py-1 rounded text-bold text-4xl text-white">
              <img src={logo} alt="Logo" />
            </span>
          </Link>
          <p className="mt-3 text-sm text-white">
            Where Your song gets maximum attention...
          </p>
        </div>
        <div className="md:mx-5 flex-1">
          <form>
            <h2 className="mt-5 text-3xl text-bold text-white">Sign In</h2>
            <div className="mt-5">
              <FloatingLabel
                className="text-white bg-black"
                type="email"
                label="Email"
                variant="outlined"
                {...register('email', { required: 'This field is required' })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="mt-5">
              <FloatingLabel
                className="text-white bg-black"
                type="password"
                label="Password"
                variant="outlined"
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <Button
              type="submit"
              outline
              gradientDuoTone="pinkToOrange"
              className="whitespace-nowrap text-bold text-xl mx-auto w-full mt-4"
            >
              Sign In
            </Button>
            <p className="tex-xl mt-3 text-white">
              Not a member?{' '}
              <Link to="/sign-up" className="text-pink-500">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
