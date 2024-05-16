import { FaBars, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Dispatch, SetStateAction, useState } from 'react'
import SearchBar from './SearchBar'
import LogoutBtn from './LogoutBtn'
import { useAppContext } from '../context/AppContext'

type props = {
  sidebarToggle: boolean
  setSidebarToggle: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({ sidebarToggle, setSidebarToggle }: props) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
  const { isLoggedIn } = useAppContext()
  return (
    <nav className="bg-black px-4 py-3 flex justify-between">
      <div>
        <FaBars
          className="text-white me-4 cursor-pointer h-6 w-6"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
      </div>
      <SearchBar />
      {isLoggedIn ? (
        <>
          <div className="flex items-center gap-x-5 ">
            <div className="text-white">
              <FaBell className="w-6 h-6" />
            </div>

            <div className="relative">
              <button
                className="text-white"
                onClick={() => setShowDropDown(!showDropDown)}
              >
                <FaUserCircle className="mt-1 w-6 h-6" />
              </button>

              <div
                className={`${
                  showDropDown ? 'block ' : 'hidden '
                } z-10 bg-gray-900 absolute rounded-lg shadow w-32 top-full right-0 `}
              >
                <ul className="px-3 py-3 text-sm text-white space-y-5">
                  <li className="rounded hover:shadow hover:bg-gray-500 py-1">
                    <Link to="/">Profile</Link>
                  </li>
                  <li className="rounded hover:shadow hover:bg-gray-500 py-1">
                    <Link to="/">Setting</Link>{' '}
                  </li>
                  <li className="rounded hover:shadow hover:bg-gray-500 py-1">
                    <Link to="/">Become an Artist</Link>
                  </li>
                  <LogoutBtn />
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex">
          <Link to="/sign-in">
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-nowrap"
            >
              Sign In
            </button>
          </Link>
          <Link to="/sign-up">
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-nowrap"
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
