import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  return (
    <div>
      <div className="relative w-[45%] -ms-36 flex items-center gap-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <IoSearch className="text-gray-500 dark:text-gray-300" />
        </div>
        <input
          type="text"
          placeholder="Search Garden Content"
          className="pl-10 w-full px-4 py-2 rounded-md border dark:text-white dark:border-none bg-gray-100 border-gray-300 dark:bg-darkModal outline-none dark:focus:ring-0 focus:ring-2 focus:ring-[#00984b]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search garden content"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
        <div className="relative" ref={filterDropdownRef}>
          <IoFilterSharp
            className="text-xl cursor-pointer dark:text-white"
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            title="Filter"
            aria-label="Filter options"
          />
          {filterDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-darkModal rounded-lg shadow-lg z-50">
              <ul className="py-2">
                <li
                  onClick={() => handleFilterOptionClick("Top Likes")}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                >
                  Top Likes
                </li>
                <li
                  onClick={() => handleFilterOptionClick("Top Dislikes")}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                >
                  Top Dislikes
                </li>
                <li
                  onClick={() => handleFilterOptionClick("Top Comments")}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                >
                  Top Comments
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
