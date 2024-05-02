import logo from './../assets/logo.jpg'
import {
  FaChartBar,
  FaBlog,
  FaCompass,
  FaMedal,
  FaGem,
  FaBook,
  FaCog,
} from 'react-icons/fa'

const SideBarNav = () => {
  return (
    <div className="bg-black text-white h-screen w-65 fixed top-0 left-0">
      <div className="p-4">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Logo" className="w-full h-[63px]" />
        </div>
        <div className="mb-6">
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-xl">
            <FaChartBar className="mr-2" />
            Dashboard
          </a>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-xl">
            <FaBlog className="mr-2" />
            Blog
          </a>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-xl">
            <FaCompass className="mr-2" />
            Explore
          </a>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-xl">
            <FaMedal className="mr-2" />
            Hall of Fame
          </a>
        </div>
        <hr className="border-gray-600 mb-6" />
        <div>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-xl">
            <FaGem className="mr-2 bg-yellow-300" />
            Go Pro
          </a>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-xl">
            <FaBook className="mr-2" />
            Documentation
          </a>
          <a href="#" className="flex items-center py-2 px-4 hover:bg-gray-700 text-xl">
            <FaCog className="mr-2" />
            Settings
          </a>
        </div>
      </div>
    </div>
  )
}

export default SideBarNav
