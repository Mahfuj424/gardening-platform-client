"use client";
import React, { useState } from "react";
import WhatsOnYourMind from "../post/WhatsOnYourMind";
import PostCard from "../postCard/PostCard";
import RightSidebar from "../rightSidebar/RightSideBar";
import SearchBar from "../searchBar/SearchBar";
import { useGetAllPostsQuery } from "@/redux/api/post";

const HomePage = () => {
  // State to store search query and selected filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // Call the API with the search query and selected filter as params
  const { data: posts, isLoading } = useGetAllPostsQuery({
    search: searchQuery,
    filter: selectedFilter,
  });

  // Function to handle search and filter changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="flex justify-around w-full">
      {/* Left content area */}
      <div>
        <div className="w-full dark:bg-darkBg bg-gray-100">
          {/* Pass search and filter handling to SearchBar as props */}
          <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
        </div>
        <div>
          <WhatsOnYourMind />
        </div>
        {/* Pass the fetched posts data to PostCard as props */}

        <PostCard postData={posts?.data || []} isLoading={isLoading} />
      </div>

      {/* Fixed Right Sidebar */}
      <div className="w-72 hidden md:block">
        <div className="fixed top-16 pt-2 right-3 h-screen">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
