

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-100 text-gray-800 rounded-md py-2 px-4 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute top-0 right-0 mt-2 mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a4 4 0 11-8 0 4 4 0 018 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.5 15l4.5 4.5"
          />
        </svg>
      </button>
    </div>
  )
}

export default SearchBar
