/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useRef } from "react";
import { IoSearch, IoFilterSharp } from "react-icons/io5";

// Add onSearch and onFilter as props
const SearchBar = ({ onSearch, onFilter }:any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    onSearch(searchQuery); // Pass search query to HomePage
  };

  const handleFilterOptionClick = (filter: string) => {
    onFilter(filter); // Pass selected filter to HomePage
    setFilterDropdownOpen(false);
  };

  // Close the dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterDropdownRef.current &&
      !filterDropdownRef.current.contains(event.target as Node)
    ) {
      setFilterDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="relative w-full flex items-center gap-2 mt-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <IoSearch className="text-gray-500 dark:text-gray-300" />
        </div>
        <input
          type="text"
          placeholder="Search Garden Content"
          className="pl-10 w-full px-4 py-2 rounded-md border dark:text-white dark:border-none bg-gray-100 border-gray-300 dark:bg-darkModal outline-none  focus:ring-2 focus:ring-[#00984b]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search garden content"
        />
        <button
          className="bg-custom-gradient text-white px-4 py-2 rounded"
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
                  onClick={() => handleFilterOptionClick("like")}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                >
                  Top Likes
                </li>
                <li
                  onClick={() => handleFilterOptionClick("dislike")}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer"
                >
                  Top Dislikes
                </li>
                <li
                  onClick={() => handleFilterOptionClick("comments")}
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
