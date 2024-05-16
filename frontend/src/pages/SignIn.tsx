import { Button, FloatingLabel } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from './../api-client'
import { useAppContext } from '../context/AppContext'
import Loader from '../components/Loader'

export type LoginFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const { showToast } = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isLoading} = useMutation(apiClient.SignIn, {
    onSuccess: async () => {
      showToast({ message: 'Login successful', type: 'SUCCESS' })
      await queryClient.invalidateQueries('validateToken')
      navigate('/')
    },
    onError: async (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  if (isLoading) {
    return <Loader />
  }


  return (
    <div className="min-h-screen mt-20 p-10">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center max-lg:p-3">
        <div className="md:mx-5 flex-1">
          <form onSubmit={onSubmit}>
            <h2 className="mt-5 text-3xl text-center text-bold text-white">
              Sign In
            </h2>
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