import logo from './../assets/logo.jpg'

import { Button, FloatingLabel } from 'flowbite-react'
import { Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import * as apiClient from '../api-client'

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  displayName: string
  password: string
  confirmPassword: string
}

const SignUp = () => {

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>()



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
            <h2 className="mt-5 text-3xl text-bold text-white">Sign Up</h2>
            <div className="mt-5">
              <FloatingLabel
                className="text-white bg-black"
                type="text"
                label="First name"
                variant="outlined"
                {...register('firstName', {
                  required: 'This field is required',
                })}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </div>
            <div className="mt-5">
              <FloatingLabel
                className="text-white bg-black"
                type="text"
                label="Last name"
                variant="outlined"
                {...register('lastName', {
                  required: 'This field is required',
                })}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </div>
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
                type="email"
                label="Email"
                variant="outlined"
                {...register('displayName', { required: 'This field is required', minLength: {
                  value: 2,
                  message: 'At least 2 characters is required.',
                  },
                  validate: async(val) => {
                    const { data: existingUser } = useQuery(
                      'checkDisplayNameExists',
                      await apiClient.checkDisplayNameExists(val)
                    )
                    if (existingUser) {
                      return 'Display name already taken, choose another'
                    }
                  }
                })}
              />
              {errors.displayName && (
                <span className="text-red-500">{errors.displayName.message}</span>
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
            <div className="mt-5">
              <FloatingLabel
                className="text-white bg-black"
                type="password"
                label="Confirm Password"
                variant="outlined"
                {...register('confirmPassword', {
                  validate: (val) => {
                    if (!val) {
                      return 'This field is required'
                    } else if (watch('password') !== val) {
                      return 'Your passwords do not match'
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              outline
              gradientDuoTone="pinkToOrange"
              className="whitespace-nowrap text-bold text-xl mx-auto w-full mt-4"
            >
              Sign Up
            </Button>
            <p className="tex-xl mt-3 text-white">
              Already in?{' '}
              <Link to="/sign-in" className="text-pink-500">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp

