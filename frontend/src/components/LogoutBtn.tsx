import { useMutation, useQueryClient } from "react-query"
import * as apiClient from './../api-client'
import { useAppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import Loader from "./Loader"


const LogoutBtn = () => {
    const queryClient = useQueryClient()
    const { showToast} = useAppContext()
    const navigate = useNavigate()
    const { mutate, isLoading} = useMutation(apiClient.Logout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
            showToast({ message: 'Logged out', type: 'SUCCESS'})
            navigate('/sign-in')
        },
        onError: (error:Error) => {
            showToast({ message: error.message, type: "ERROR"})
        }
    })

    const handleClick = () => {
        mutate()
    }
    
    if (isLoading) {
      return <Loader />
    }
  return (
    <button
      onClick={handleClick}
      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-2 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    >
      Logout
    </button>
  )
}

export default LogoutBtn