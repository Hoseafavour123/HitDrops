import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="p-4 flex justify-between items-center w-full">
      <div className="w-full mr-10">
        <input
          type="text"
          placeholder="Search for songs, artists..."
          className="w-[50%] text-white bg-black px-4 py-2 rounded-md focus:outline-none "
        />
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center justify-end space-x-4 w-1/4">
        <Link to="/sign-in" className="bg-gray-500 text-white px-4 py-2 rounded-md">Login</Link>
        <Link to="/sign-up" className="bg-pink-500 text-white px-4 py-2 rounded-md">Register</Link>
      </div>
    </nav>
  );
}

export default NavBar
