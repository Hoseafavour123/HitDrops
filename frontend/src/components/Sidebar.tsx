import logo from './../assets/logo.jpg'
import {FaHome, FaChartBar, FaCompass, FaBook, FaCrown} from 'react-icons/fa'
import { Link, useLocation, useParams } from 'react-router-dom'

type props = {
    sidebarToggle: boolean
}

const Sidebar = ({sidebarToggle}: props) => {
  return (
    <div className={`${sidebarToggle ? 'hidden': 'block'}  w-64 bg-black fixed h-full px-4 py-2 z-20`}>
      <div className="ml-[18%] w-[60%]">
        <Link to="/">
          <img src={logo} alt="HitDrops Logo" />
        </Link>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
          <Link to="/" className="px-3">
            <FaHome className="inline-block h-6 w-6 mr-2"></FaHome>
            Home
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
          <Link to="/" className="px-3">
            <FaChartBar className="inline-block h-6 w-6 mr-2"></FaChartBar>
            Dashboard
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
          <Link to="/" className="px-3">
            <FaCompass className="inline-block h-6 w-6 mr-2"></FaCompass>
            Discover
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
          <Link to="/" className="px-3">
            <FaBook className="inline-block h-6 w-6 mr-2"></FaBook>
            Genres
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
          <Link to="/" className="px-3">
            <FaCrown className="inline-block h-6 w-6 mr-2 bg-yellow-300"></FaCrown>
            Hall of Fame
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
