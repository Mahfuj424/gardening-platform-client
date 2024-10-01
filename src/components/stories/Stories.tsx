"use client"; // Make sure this is present to enable client-side rendering

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';

const Stories = () => {
  const swiperRef = useRef(null); // Reference to the Swiper instance

  const stories = [
    { name: "User 1", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 2", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 3", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 4", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 5", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 1", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 2", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 3", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 4", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 5", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 1", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 2", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 3", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 4", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    { name: "User 5", avatar: "https://i.ibb.co/xm54tqk/profile-Image.jpg" },
    // Add more users
  ];



  return (
    <div className="relative bg-white dark:bg-darkCard p-5 shadow rounded-md">
      <Swiper
        ref={swiperRef} // Attach the reference to Swiper
        spaceBetween={5}
        slidesPerView={8}
        navigation={false} // Disable default navigation
        pagination={{ clickable: true }}
        loop={true}
        modules={[Pagination, Navigation]}
      >
        {stories.map((story, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-16 h-16 rounded-full border-4 border-gray-900"
              />
              <p className="text-xs mt-2 text-white">{story.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Stories;
