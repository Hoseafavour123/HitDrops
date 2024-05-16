

import { Button, FloatingLabel } from 'flowbite-react'
import { Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient} from 'react-query'
import * as apiClient from '../api-client'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'


export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  displayName: string
  password: string
  confirmPassword: string
}

const SignUp = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm<RegisterFormData>()

  const { mutate, isLoading } = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({message:'Registration successful', type:'SUCCESS'});
      await queryClient.invalidateQueries('validateToken')
      navigate('/')
      
    },
    onError: (error: Error) => {
      showToast({message: error.message, type:'ERROR'});
      
    }
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })
  
  {/*const { data: existingUser } = useQuery('checkDisplayNameExists', () =>
  apiClient.checkDisplayNameExists(val))*/}


 if (isLoading) {
  return <Loader/>
 }

  return (
    <div className="min-h-screen mt-20 p-10">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center max-lg:p-3">
        <div className="md:mx-5 flex-1">
          <form onSubmit={onSubmit}>
            <h2 className="mt-5 text-3xl text-bold text-white text-center">Sign Up</h2>
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
           {/* <div className="mt-5">
              <FloatingLabel
                className="text-white bg-black"
                type="text"
                label="Music name (Display name)"
                variant="outlined"
                {...register('displayName', { required: 'This field is required', minLength: {
                  value: 2,
                  message: 'At least 2 characters is required.',
                  },
                  validate: () => {
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
            */}
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

